enchant();

var GameScreenWidth = 320;
var GameScreenHeight = 600;
var GameAroundLength = GameScreenWidth * 2 + GameScreenHeight * 2;
var GameFPS = 30;
var GameWave = 1;
var GameMaxWave = 10;

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
var EnemyHP = 1;
var EnemyAttack = 1;

//敵位置設定（スクリーンの周縁部）
function setEnemyPosition(){
  var val = Math.random() * GameAroundLength;
  if(val <= GameScreenWidth){
    return {x: val, y: 0};
  } else if(GameScreenWidth < val && val <= GameScreenWidth + GameScreenHeight) {
    return {x: GameScreenWidth, y: val - GameScreenWidth};
  } else if(GameScreenWidth + GameScreenHeight < val && val <= GameScreenWidth * 2 + GameScreenHeight){
    return {x: val - GameScreenWidth - GameScreenHeight, y: GameScreenHeight};
  } else {
    return {x: 0, y: val - GameScreenWidth * 2 - GameScreenHeight};
  }
}

//二点間の距離
function distance(x, y, ox, oy){
  return Math.sqrt(Math.pow(x - ox, 2) + Math.pow(y - oy, 2));
}

//自機設定
var player;

//現在の敵の数
var numberEnemy = 0;

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
    this.remove();
  },
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

    this.attack = PlayerAttack;
    this.attackDelay = 0;
    this.attackInterval = PlayerAttackInterval;

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
  }
});



var Enemy = enchant.Class.create(enchant.Sprite, {
  initialize: function(wid, hei){
    enchant.Sprite.call(this, wid, hei);
    this.image = game.assets[EnemyImageFilename];
    this.frame = 0;
    var pos = setEnemyPosition();
    this.x = pos.x;
    this.y = pos.y;
    this.speed = EnemySpeed;

    this.hp = EnemyHP;
    this.attack = EnemyAttack;
    this.attackDelay = 0;

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
    if(this.intersect(player) && player.attackDelay >= player.attackInterval){
      this.hp -= player.attack;
      player.attackDelay = 0;

      var x = (this.x + player.x) / 2;
      var y = (this.y + player.y) / 2;
      var crs = new Crush(x, y,
             PlayerAttackImageWidth,
             PlayerAttackImageHeight,
             PlayerAttackImageFilename,
             PlayerAttackImageFrame
      );

      if(this.hp <= 0) this.isToRemoved = true;
    }
    this.attackDelay++;
  },
  remove: function(){
    game.rootScene.removeChild(this);
    delete this;
    numberEnemy--;
  },
  move: function(){
    this.tl.clear();
    this.tl.moveTo(player.x, player.y,
      distance(this.x, this.y, player.x, player.y) / this.speed,
      enchant.Easing.LINEAR);
  }
});



window.onload = function(){
  game = new enchant.Core(GameScreenWidth, GameScreenHeight);
  game.fps = GameFPS;

  game.preload(PlayerImageFilename);
  game.preload(EnemyImageFilename);
  game.preload(PlayerAttackImageFilename);

  game.onload = function(){


    //自機設定
    player = new Player();


    //自機移動リスナ登録
    game.rootScene.on("touchstart", function(ev){
      player.isToMove = true;
      player.moveToX = ev.x;
      player.moveToY = ev.y;
    });


    //Wave n での敵の行動
    wave[0] = function(){
        if(game.frame % EnemyInterval == 0 && numberEnemy < EnemyMax){
              var enm = new Enemy(EnemyImageWidth, EnemyImageHeight);

        }
    }

    //Wave 1 での敵の行動リスナ登録
    game.rootScene.on("enterframe", wave[0]);

  };

  game.start();
};
