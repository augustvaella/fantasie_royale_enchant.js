enchant();

var GameScreenWidth = 320;
var GameScreenHeight = 600;
var GameAroundLength = GameScreenWidth * 2 + GameScreenHeight * 2;
var GameFPS = 30;
var GameWave = 1;
var GameMaxWave = 10;

var UIPlayerHPBarX = 50;
var UIPlayerHPBarY = 15;
var UIPlayerHPBarImageFilename = "bar.png";
var UIScoreX = GameScreenWidth / 2;
var UIScoreY = 15;
var UITextHPX = 0;
var UITextHPY = UIPlayerHPBarY;
var UITextHPWidth = 50;

var PlayerImageWidth = 32;
var PlayerImageHeight = 40;
var PlayerImageFilename = "./image/player.png";
var PlayerSpeed = 10;
var PlayerEnabled = true;
var PlayerAttack = 1;
var PlayerAttackInterval = GameFPS / 2;
var PlayerAttackImageFilename = "./image/attack.png";
var PlayerAttackImageWidth = 32;
var PlayerAttackImageHeight = 32;
var PlayerAttackImageFrame = [0, 0, 0, 1, 1, 1, 2, 2, 2, null];
var PlayerHP = 100;

var EnemyImageWidth = 32;
var EnemyImageHeight = 32;
var EnemyImageFilename = "./image/enemy.png";
var EnemySpeed = 5;
var EnemyMax = 30; //the max number of the enemies
var EnemyInterval = GameFPS;
var EnemyMoveInterval = GameFPS;
var EnemyAttackInterval = 6;
var EnemyHP = 1;
var EnemyAttack = 1;
var EnemyScore = 10;

var JaparimanWidth = 32;
var JaparimanHeight = 32;
var JaparimanImageFilename = "./image/japariman.png";
var JaparimanRecoverHP = 30;
var JaparimanInterval = GameFPS * 10;
var JaparimanMoveDX = 5;
var JaparimanMoveDY = 5;
var JaparimanSpeed = 5;


//二点間の距離
//return {number}
function distance(x, y, ox, oy){
  return Math.sqrt(Math.pow(x - ox, 2) + Math.pow(y - oy, 2));
}



//画面の周囲にスプライトを配置する座標を返す
//@param wid スプライトの width
//@param hei スプライトの height
//@return 座標 [x: {number}, y: {number}]
function answerPositionScreenAround(wid, hei){
  var val = Math.random() * (GameScreenWidth * 2 + GameScreenHeight * 2 - wid * 2 - hei * 2);
  var width = GameScreenWidth - wid;
  var height = GameScreenHeight - hei;
  if(val <= width){
    return {x: val, y: 0};
  } else if(width < val && val <= width + height) {
    return {x: width, y: val - width};
  } else if(width + height < val && val <= width * 2 + height){
    return {x: val - width - height, y: height};
  } else {
    return {x: 0, y: val - width * 2 - height};
  }
}


var ui;

//自機設定
var player;

//現在の敵の数
var numberEnemy = 0;

var numberJapariman = 0;

var wave = [];

var game;


//爆発クラス
//アニメーションフレームが配列であり、その配列で null があると
//オブジェクト自体が消去される。
var Crush = enchant.Class.create(enchant.Sprite,{
  initialize: function(x, y, wid, hei, fn, frm){
    enchant.Sprite.call(this, wid, hei);
    this.x = x;
    this.y = y;
    this.image = game.assets[fn];
    this.frame = frm; //配列！

    game.rootScene.addChild(this);
  },
  onenterframe: function(){
  },
  onanimationend: function(){
    this.finalize();
    this.remove();
  },
  finalize: function(){},
  remove: function(){
      game.rootScene.removeChild(this);
      delete this;
  }
});



var Player = enchant.Class.create(enchant.Sprite,{
  initialize: function(){
    enchant.Sprite.call(this, PlayerImageWidth, PlayerImageHeight);
    this.image = game.assets[PlayerImageFilename];
    this.x = (GameScreenWidth - PlayerImageWidth) / 2;
    this.y = (GameScreenHeight - PlayerImageHeight) / 2;
    this.frame = 0;

    this.hp = PlayerHP;
    this.hpMax = PlayerHP;

    this.attack = PlayerAttack;
    this.attackDelay = 0;
    this.attackInterval = PlayerAttackInterval;

    this.score = 0;

    this.enabled = true;

    this.isToMove = false;
    this.moveToX = 0;
    this.moveToY = 0;
    this.speed = PlayerSpeed;
    game.rootScene.addChild(this);
  },

  onenterframe: function(){
    if(this.isToMove){
      this.move();
      this.isToMove = false;
    }
    this.attackDelay++;
  },

  move: function(){
    if(this.enabled){
      var dx = this.moveToX - (this.width / 2);
      var dy = this.moveToY - (this.height / 2);
      var frm = distance(dx, dy, this.x, this.y) / this.speed;
      this.tl.clear();
      this.tl.moveTo(dx, dy, frm, enchant.Easing.LINEAR);
    }
  },

  recoverHP: function(val){
    this.hp += val;
    if(this.hp > this.hpMax) this.hp = this.hpMax;
  },

  damageHP: function(val){
    this.hp -= val;
  },

  gainScore: function(val){
    this.score += val;
  },

  finalize: function(){}
});



var Item  = enchant.Class.create(enchant.Sprite, {
  initialize: function(wid, hei, fn){
    enchant.Sprite.call(this, wid, hei);
    this.image = game.assets[fn];
    game.rootScene.addChild(this);
  },

  onenterframe: function(){
    if(this.intersect(player)){
      this.ontouchplayer();
      this.remove();
    }
    this.move();
  },

  ontouchplayer: function(){},

  move: function(){},

  remove: function(){
    this.finalize();
    game.rootScene.removeChild(this);
    delete this;
  },

  finalize: function(){}
});



var Japariman = enchant.Class.create(Item, {
  initialize: function(){
    Item.call(this, JaparimanWidth, JaparimanHeight, JaparimanImageFilename);
    var pos = answerPositionScreenAround(this.width, this.height);
    this.x = pos.x;
    this.y = pos.y;
    this.speed = JaparimanSpeed;

    numberJapariman++;
  },

  move: function(){
    if(game.frame % this.speed != 0) return;
    var dx = JaparimanMoveDX;
    var dy = JaparimanMoveDY;
    if(this.x >= game.width - this.width
       || (this.x > 0 && Math.random() > 0.5)) dx = -dx;
    if(this.y >= game.height - this.height
       || (this.y > 0 && Math.random() > 0.5)) dy = -dy;

    this.tl.moveBy(dx, dy, this.speed, enchant.Easing.LINEAR);
  },

  ontouchplayer: function(){
    player.recoverHP(JaparimanRecoverHP);
  },

  finalize: function(){
    numberJapariman--;
  }
});



var Enemy = enchant.Class.create(enchant.Sprite, {
  initialize: function(wid, hei){
    enchant.Sprite.call(this, wid, hei);
    this.image = game.assets[EnemyImageFilename];
    this.frame = 0;
    var pos = this.answerPosition();
    this.x = pos.x;
    this.y = pos.y;
    this.speed = EnemySpeed;

    this.hp = EnemyHP;
    this.attack = EnemyAttack;
    this.attackDelay = 0;
    this.attackInterval = EnemyAttackInterval;

    this.score = EnemyScore;

    this.isToMove = false;
    this.moveToX = 0;
    this.moveToY = 0;
    this.moveInterval = EnemyMoveInterval;

    this.isToRemoved = false;

    game.rootScene.insertBefore(this, player);
    numberEnemy++;
  },

  onenterframe: function(){
    if(this.isToRemoved){
      this.remove();
      this.isToRemoved = false;
    }

    if(this.isToMove){
      this.move();
      this.isToMove = false;
    }

    if(this.age % this.moveInterval == 0){
      this.move();
    }

    if(this.intersect(player)){
      if(this.age % this.attackInterval == 0) {
        player.damageHP(this.attack);
      }

      if(player.attackDelay >= player.attackInterval){
        this.damageHP(player.attack);
        player.attackDelay = 0;

        var x = (this.x + player.x) / 2;
        var y = (this.y + player.y) / 2;
        var crs = new Crush(x, y,
               PlayerAttackImageWidth,
               PlayerAttackImageHeight,
               PlayerAttackImageFilename,
               PlayerAttackImageFrame
        );
      }
    }

    this.attackDelay++;
  },

  remove: function(){
    this.finalize();
    player.gainScore(this.score);
    game.rootScene.removeChild(this);
    delete this;
    numberEnemy--;
  },

  move: function(){
    this.tl.clear();
    this.tl.moveTo(player.x, player.y,
      distance(this.x, this.y, player.x, player.y) / this.speed,
      enchant.Easing.LINEAR);
  },

  //敵位置設定（スクリーンの周縁部）
  answerPosition: function(){
    return answerPositionScreenAround(this.width, this.height);
  },

  damageHP: function(val){
    this.hp -= val;
    if(this.hp <= 0) this.isToRemoved = true;
  },

  finalize: function(){

  }
});



var UI = enchant.Class.create(enchant.Group, {
  initialize: function(){
    enchant.Group.call(this);

    this.playerHPBar = new enchant.ui.Bar(UIPlayerHPBarX, UIPlayerHPBarY);
    this.playerHPBar.direction = "right";
    this.playerHPBar.image = game.assets[UIPlayerHPBarImageFilename];
    this.playerHPBar.maxvalue = PlayerHP;
    this.playerHPBar.value = this.playerHPBar.maxvalue;
    this.addChild(this.playerHPBar);

    this.score = new enchant.ui.ScoreLabel(UIScoreX, UIScoreY);
    this.score.score = 0;
    this.addChild(this.score);

    this.hpLabel = new enchant.ui.MutableText(UITextHPX, UITextHPY, UITextHPWidth);
    this.hpLabel.text = "HP:"
    this.addChild(this.hpLabel);

    game.rootScene.addChild(this);
  },

  onenterframe: function(){
    this.playerHPBar.value = player.hp;
    this.score.score = player.score;
  }
});



window.onload = function(){
  game = new enchant.Core(GameScreenWidth, GameScreenHeight);
  game.fps = GameFPS;

  game.preload(PlayerImageFilename);
  game.preload(EnemyImageFilename);
  game.preload(PlayerAttackImageFilename);
  game.preload(JaparimanImageFilename);
  game.preload(UIPlayerHPBarImageFilename);

  game.onload = function(){


    //自機インスタンス
    player = new Player();

    ui = new UI();

    function beginPlayerMove(ev){
      player.isToMove = true;
      player.moveToX = ev.x;
      player.moveToY = ev.y;
    }

    //自機移動リスナ登録
    game.rootScene.on("touchstart", beginPlayerMove);


    //Wave n での敵の行動
    wave[0] = function(){
        if(game.frame % EnemyInterval == 0 && numberEnemy < EnemyMax){
              var enm = new Enemy(EnemyImageWidth, EnemyImageHeight);

        }
        if(numberJapariman < 1 && game.frame % JaparimanInterval == 0){
            var jpr = new Japariman();
        }
    }

    //Wave 1 での敵の行動リスナ登録
    game.rootScene.on("enterframe", wave[0]);

  };

  game.start();
};
