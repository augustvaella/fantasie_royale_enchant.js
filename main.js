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
var UIFontWidth = 16;
var UIScoreKeta = 9;

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
var PlayerAttackEffectFilename = "./effects/cutting_wind1.mp3";
var PlayerHP = 50;
var PlayerDamageEffectFilename = "./effects/damage1.mp3";

var EnemyImageWidth = 32;
var EnemyImageHeight = 32;
var EnemyImageFilename = "./image/enemy.png";
var EnemySpeed = 5;
var EnemyMax = 30; //the max number of the enemies
var EnemyInterval = GameFPS;
var EnemyMoveInterval = GameFPS;
var EnemyAttackInterval = 6;
var EnemyRemoveEffectFilename = "./effects/damage6.mp3";
var EnemyHP = 1;
var EnemyAttack = 1;
var EnemyScore = 100;

var JaparimanWidth = 32;
var JaparimanHeight = 32;
var JaparimanImageFilename = "./image/japariman.png";
var JaparimanRecoverHP = 15;
var JaparimanInterval = GameFPS * 10;
var JaparimanMoveDX = 5;
var JaparimanMoveDY = 5;
var JaparimanSpeed = 5;

var ItemGetEffectFilename = "./effects/coin04.mp3";
var ItembarFilename = "./image/itembar.png";
var ItembarWidth = 320;
var ItembarHeight = 50;

var BombFilename = "./image/bomb.png";
var BombWidth = 48;
var BombHeight = 48;
var BombEffectFilename =  EnemyRemoveEffectFilename;
var BombFrame = [0, 0, 1, 1, 2, 2, null];

var Cellien = {
  EnemyImageWidth: 32,
  EnemyImageHeight: 32,
  EnemyImageFilename: "./image/enemy.png",
  EnemySpeed: 5,
  EnemyHP: 1,
  EnemyAttack: 1,
  EnemyAttackInterval: 6,
  EnemyScore: 100,
  EnemyMoveInterval: 30
};


var WaveObject = [];

WaveObject[1] = {
  NumberEnemyMax: 30,
  NumberEnemyWhereBossCome: 60,
  IntervalWhenEventOccur: 30,
  IntervalEnemy: 60,
  IntervalJapariman: 120,
  EventMethod: function(){
    if(this.age % this.intervalEnemy == 0 && this.numberEnemy < this.numberEnemyMax){
          var enm = new Enemy(Cellien);

    }
    if(this.numberJapariman < 1 && this.age % this.intervalJapariman == 0){
        var jpr = new Japariman();
    }
  }
};


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
  var height = GameScreenHeight - ItembarHeight - hei;
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

var wave;

var game;


//ゲームオーバーシーン
var GameoverScene = enchant.Class.create(enchant.Scene,{
  initialize: function(){
    enchant.Scene.call(this);
    this.gameoverLabel = new enchant.ui.MutableText(
      (GameScreenWidth - UIFontWidth * 9) /2,
      (GameScreenHeight - UIFontWidth ) / 2,
      UIFontWidth * 9
    );
    this.gameoverLabel.text = "Game Over";
    this.addChild(this.gameoverLabel);

  },
  onenter: function(){
    game.stop();
  }
});


var OpeningScene = enchant.Class.create(enchant.Scene,{
  initialize: function(){
    enchant.Scene.call(this);
    var ttl = "Kemoflex";
    var tch = "Touch Me!";
    this.title = new enchant.ui.MutableText(
      (GameScreenWidth - UIFontWidth * ttl.length) /2,
      (GameScreenHeight - UIFontWidth ) / 2,
      UIFontWidth * ttl.length
    );
    this.title.text = ttl;
    this.addChild(this.title);

    this.touchMe = new enchant.ui.MutableText(
      (GameScreenWidth - UIFontWidth * tch.length) /2,
      (GameScreenHeight - UIFontWidth ) / 2 + UIFontWidth * 2,
      UIFontWidth * tch.length
    );
    this.touchMe.text = tch;
    this.addChild(this.touchMe);
  },
  ontouchstart: function(){
    game.popScene();
    game.pushScene(new WaveInformation(1));
  }
});


//@param {number}num Waveのナンバー
var WaveInformation = enchant.Class.create(enchant.Scene, {
  initialize: function(num){
    enchant.Scene.call(this);

    this.number = num;

    var txt = "Wave "+ num.toString();
    this.text = new enchant.ui.MutableText(
      (GameScreenWidth - UIFontWidth * txt.length) / 2,
      (GameScreenHeight - UIFontWidth) / 2,
      UIFontWidth * txt.length
    );
    this.text.text = txt;
    this.addChild(this.text);
  },
  ontouchstart: function(){
    wave = new Wave(WaveObject[this.number]);
    game.popScene();
  }
});



var Wave = enchant.Class.create(enchant.Node, {
  initialize: function(obj){
    enchant.Node.call(this);

    this.numberEnemyMax = obj["NumberEnemyMax"];
    this.numberEnemy = 0;
    this.intervalEnemy = obj["IntervalEnemy"];
    this.numberEnemyWhereBossCome = obj["NumberEnemyWhereBossCome"];
    this.intervalWhenEventOccur = obj["IntervalWhenEventOccur"];
    this.numberJapariman = 0;
    this.numberJaparimanMax = 1;
    this.intervalJapariman = obj["IntervalJapariman"];

    this.isEnemyAnihilated = false;
    this.isEnemyStop = false;

    this.wait = 0;

    this.eventMethod = obj["EventMethod"];

    game.rootScene.addChild(this);
  },
  onenterframe: function(){
    if(this.wait > 0) return --this.wait;

    if(this.age % this.intervalWhenEventOccur == 0){
      this.eventMethod();
    }
  },
  end: function(){
    game.rootScene.removeChild(this);
    delete this;
  },
  eventMethod: function(){

  },
  finalize: function(){

  }
});

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
  remove: function(){
      game.rootScene.removeChild(this);
      delete this;
  },
  finalize: function(){}
});


var PlayerAttackImage = enchant.Class.create(Crush,{
  initialize: function(x, y){
    Crush.call(this, x, y,
      PlayerAttackImageWidth,
      PlayerAttackImageHeight,
      PlayerAttackImageFilename,
      PlayerAttackImageFrame);
  },
  finalize(){}
});



var Bomb = enchant.Class.create(Crush,{
  initialize: function(x, y){
    Crush.call(this, x, y, BombWidth, BombHeight, BombFilename, BombFrame);

    var snd = game.assets[BombEffectFilename].clone();
    snd.play();
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
    this.attackEffect = game.assets[PlayerAttackEffectFilename];

    this.damageEffect = game.assets[PlayerDamageEffectFilename];

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
    if(this.hp < 0) this.finalize();
  },

  gainScore: function(val){
    this.score += val;
  },

  finalize: function(){
    game.pushScene(new GameoverScene);
  }
});



var Item  = enchant.Class.create(enchant.Sprite, {
  initialize: function(wid, hei, fn){
    enchant.Sprite.call(this, wid, hei);
    this.image = game.assets[fn];
    this.getEffect = game.assets[ItemGetEffectFilename];

    game.rootScene.addChild(this);
  },

  onenterframe: function(){
    if(this.intersect(player)){
      this.ontouchplayer();

      var snd = this.getEffect.clone();
      snd.play();

      this.remove();
    }

    if(this.x + this.width < 0 || this.y + this.height < 0
       ||this.x > game.width || this.y > game.height){
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

    wave.numberJapariman++;
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
    wave.numberJapariman--;
  }
});



var Enemy = enchant.Class.create(enchant.Sprite, {
  initialize: function(obj){
    enchant.Sprite.call(this, obj["EnemyImageWidth"], obj["EnemyImageHeight"]);
    this.image = game.assets[obj["EnemyImageFilename"]];
    this.frame = 0;
    var pos = this.answerPosition();
    this.x = pos.x;
    this.y = pos.y;
    this.speed = obj["EnemySpeed"];

    this.hp = obj["EnemyHP"];
    this.attack = obj["EnemyAttack"];
    this.attackDelay = 0;
    this.attackInterval = obj["EnemyAttackInterval"];

    this.score = obj["EnemyScore"];

    this.isToMove = false;
    this.moveToX = 0;
    this.moveToY = 0;
    this.moveInterval = obj["EnemyMoveInterval"];

    this.isToRemoved = false;

    this.enabled = true;

    game.rootScene.insertBefore(this, player);
    wave.numberEnemy++;
  },

  onenterframe: function(){
    if(!this.enabled) return;

    if(this.isToRemoved){
      this.remove();
      this.isToRemoved = false;
    }

    if(wave.isEnemyAnihilated){
      this.remove();
    }

    this.move();

    if(this.intersect(player)){
      this.ontouchplayer();
    }

    this.attackDelay++;
  },

  ontouchplayer: function(){
    if(this.age % this.attackInterval == 0) {
      player.damageHP(this.attack);

      var snd = player.damageEffect.clone();
      snd.play();
    }

    if(player.attackDelay >= player.attackInterval){
      this.damageHP(player.attack);
      player.attackDelay = 0;

      var snd = player.attackEffect.clone();
      snd.play();

      var x = (this.x + player.x) / 2;
      var y = (this.y + player.y) / 2;
      var crs = new PlayerAttackImage(x, y);
    }
  },

  remove: function(){
    this.finalize();
    player.gainScore(this.score);

    var bmb = new Bomb(this.x + (this.width - BombWidth), this.y + (this.height - BombHeight));

    game.rootScene.removeChild(this);
    delete this;

    wave.numberEnemy--;
  },

  move: function(){
    if(this.age % this.moveInterval != 0) return;

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

    this.score = new enchant.ui.MutableText(UIScoreX, UIScoreY, UIFontWidth * UIScoreKeta);
    this.score.text = "0";
    this.addChild(this.score);

    this.hpLabel = new enchant.ui.MutableText(UITextHPX, UITextHPY, UITextHPWidth);
    this.hpLabel.text = "HP:"
    this.addChild(this.hpLabel);

    this.itembar = new enchant.Sprite(ItembarWidth, ItembarHeight);
    this.itembar.image = game.assets[ItembarFilename];
    this.itembar.x = 0;
    this.itembar.y = GameScreenHeight - ItembarHeight;
    this.addChild(this.itembar);

    game.rootScene.addChild(this);
  },

  onenterframe: function(){
    this.playerHPBar.value = player.hp;
    this.score.text = player.score.toString();
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
  game.preload(BombFilename);
  game.preload(ItembarFilename);

  game.preload(PlayerAttackEffectFilename);
  game.preload(PlayerDamageEffectFilename);
  game.preload(EnemyRemoveEffectFilename);
  game.preload(ItemGetEffectFilename);

  game.onload = function(){

    //自機インスタンス
    player = new Player();

    ui = new UI();


    function beginPlayerMove(ev){
      if(ev.y > 0 && ev.y < GameScreenHeight - ItembarHeight){
        player.isToMove = true;
        player.moveToX = ev.x;
        player.moveToY = ev.y;
      }
    }

    //自機移動リスナ登録
    game.rootScene.on("touchstart", beginPlayerMove);

    game.pushScene(new OpeningScene());
  };


  game.start();
};
