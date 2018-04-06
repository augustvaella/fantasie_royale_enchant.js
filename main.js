enchant();

var GameScreenWidth = 320;
var GameScreenHeight = 600;
var GameFieldX = 0;
var GameFieldY = 50;
var GameFieldRightX = 320;
var GameFieldRightY = 550;
var GameFPS = 30;
var GameWave = 1;

var WaveClearWait = 120;


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

var MapFilename = "./image/map.png";
var MapDataSavanna = [
  [ 6,  6,  6,  6, 11,  0,  9,  6,  6,  6],
  [ 6,  6,  6, 11,  0,  0,  0,  9, 10, 10],
  [ 6,  6, 11,  0,  0,  0,  0,  0,  0,  0],
  [ 6, 11,  0,  0,  0,  0,  0,  0,  0,  0],
  [11,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0,  1,  2,  3,  0,  0,  0,  0,  0,  1],
  [ 1,  6,  6,  6,  3,  0,  0,  0,  1,  6],
  [ 6,  6,  6,  6,  6,  3,  0,  0,  5,  6],
  [ 6,  6,  6,  6,  6,  7,  0,  0,  5,  6],
  [ 6,  6,  6,  6,  6,  7,  0,  0,  9,  6],
  [ 6,  6,  6,  6,  6,  7,  0,  0,  0,  9],
  [ 6,  6,  6,  6,  6, 11,  0,  0,  0,  0],
  [ 6,  6,  6,  6, 11,  0,  0,  0,  0,  0],
  [10, 10, 10, 11,  0,  0,  0,  0,  1,  2],
  [ 0,  0,  0,  0,  0,  0,  0,  1,  6,  6],
  [ 0,  0,  0,  0,  0,  0,  1,  6,  6,  6],
  [ 0,  0,  0,  0,  0,  1,  6,  6,  6,  6],
  [ 0,  0,  0,  0,  0,  5,  6,  6,  6,  6]
];
var MapWidth = 32;

var PlayerImageWidth = 32;
var PlayerImageHeight = 40;
var PlayerImageFilename = "./image/player.png";
var PlayerHP = 50;
var PlayerSpeed = 10;
var PlayerEnabled = true;
var PlayerAttack = 1;
var PlayerAttackBuffed = 2;
var PlayerAttackBufWait = GameFPS * 5;
var PlayerAttackInterval = GameFPS / 2;
var PlayerAttackIntervalBuffed = GameFPS / 4;
var PlayerAttackIntervalBufWait = GameFPS * 5;
var PlayerInvincibleWait = GameFPS * 5;

var PlayerAttackImageFilename = "./image/attack.png";
var PlayerAttackImageWidth = 64 ;
var PlayerAttackImageHeight = 64;
var PlayerAttackImageFrame = [0, 0, 0, 1, 1, 1, 2, 2, 2, null];
var PlayerAttackEffectFilename = "./effects/cutting_wind1.mp3";
var PlayerDamageEffectFilename = "./effects/damage1.mp3";


var EnemyImageFilename = "./image/enemy.png";
var EnemyRemoveEffectFilename = "./effects/damage6.mp3";
var EnemyBombWait = 10;
var EnemyShokushuPosition = [
  {
    x: (GameFieldRightX - GameFieldX) / 4 - 32 / 2,
    y: GameFieldY + 32 + 32
  },
  {
    x: 3 * (GameFieldRightX - GameFieldX) / 4 - 32 / 2,
    y: GameFieldY + 32 + 32
  },
  {
    x: (GameFieldRightX - GameFieldX) / 8 - 32 / 2,
    y: GameFieldY + 32
  },
  {
    x: 7 * (GameFieldRightX - GameFieldX) / 8 - 32 / 2,
    y: GameFieldY + 32
  },
  {
    x: (GameFieldRightX - GameFieldX) / 4 - 32 / 2,
    y: GameFieldRightY - 96
  },
  {
    x: 3 * (GameFieldRightX - GameFieldX) / 4 - 32 / 2,
    y: GameFieldRightY - 96
  }
];

var JaparimanWidth = 32;
var JaparimanHeight = 32;
var JaparimanImageFilename = "./image/japariman.png";
var JaparimanRecoverHP = 20;
var JaparimanInterval = GameFPS * 10;
var JaparimanMoveDX = 5;
var JaparimanMoveDY = 5;
var JaparimanSpeed = 5;

var ServalX = 36;
var ServalY = 560;
var ServalWidth = 32;
var ServalHeight = 40;
var ServalFilename = "./image/serval.png";
var CaracalX = 100;
var CaracalY = 560;
var CaracalWidth = 32;
var CaracalHeight = 40;
var CaracalFilename = "./image/caracal.png";
var RacoonX = 168;
var RacoonY = 560;
var RacoonWidth = 32;
var RacoonHeight = 36;
var RacoonFilename = "./image/racoon.png";
var FennecX = 236;
var FennecY = 560;
var FennecWidth = 44;
var FennecHeight = 36;
var FennecFilename = "./image/fennec.png";

var CutinServalX = 0;
var CutinServalY = 600;
var CutinServalWidth = 200;
var CutinServalHeight = 355;
var CutinServalFilename = "./image/cutin_serval.png";
var CutinCaracalX = 120;
var CutinCaracalY = 600;
var CutinCaracalWidth = 200;
var CutinCaracalHeight = 412;
var CutinCaracalFilename = "./image/cutin_caracal.png";
var CutinRacoonX = 120;
var CutinRacoonY = 600;
var CutinRacoonWidth = 200;
var CutinRacoonHeight = 285;
var CutinRacoonFilename = "./image/cutin_racoon.png";
var CutinFennecX = 0;
var CutinFennecY = 0;
var CutinFennecWidth = 200;
var CutinFennecHeight = 265;
var CutinFennecFilename = "./image/cutin_fennec.png";
var CutinDY = 12;

var ItemGetEffectFilename = "./effects/coin04.mp3";
var ItembarFilename = "./image/itembar.png";
var ItembarX = 0;
var ItembarY = 550;
var ItembarWidth = 320;
var ItembarHeight = 50;
var ItemFalseOpacity = 0.2;
var ItemTrueOpacity = 1.0;

var BombFilename = "./image/bomb.png";
var BombWidth = 96;
var BombHeight = 96;
var BombEffectFilename =  EnemyRemoveEffectFilename;
var BombFrame = [0, 0, 1, 1, 2, 2, null];

var Cellien = {
  ImageWidth: 32,
  ImageHeight: 32,
  ImageFilename: "./image/enemy.png",
  Speed: 5,
  HP: 1,
  Attack: 1,
  AttackInterval: 30,
  Score: 100,
  MoveInterval: 15
};

var RedCellien = {
  ImageWidth: 96,
  ImageHeight: 96,
  ImageFilename: "./image/red_cellien.png",
  Speed: 2,
  HP: 3,
  Attack: 1,
  AttackInterval: 30,
  Score: 500,
  MoveInterval: 30
};

var BossGate = {
  ImageWidth: 96,
  ImageHeight: 96,
  ImageFilename: "./image/boss_gate.png",
  Speed: 1,
  HP: 30,
  Attack: 1,
  AttackInterval: 6,
  Score: 10000,
  MoveInterval: 10000
};

var Shokushu = {
  ImageWidth: 32,
  ImageHeight: 64,
  ImageFilename: "./image/shokushu.png",
  Speed: 20,
  HP: 1,
  Attack: 1,
  AttackInterval: 30,
  Score: 100,
  MoveInterval: 30
};

var ShokushuReverseFilename = "./image/shokushu_reverse.png";



var WaveObject = [];

WaveObject[0] = {
  Number: 0,
  NumberEnemyMax: 0,
  NumberEnemyWhereBossCome: 0,
  IntervalWhenEventOccur: 1,
  IntervalEnemy: 1,
  IntervalJapariman: 1,
  IntervalServal: 1,
  IntervalCaracal: 1,
  IntervalRacoon: 1,
  IntervalFennec: 1,
  EventMethod: function(){}
};

WaveObject[1] = {
  Number: 1,
  NumberEnemyMax: 15,
  NumberEnemyWhereBossCome: 5,
  IntervalWhenEventOccur: 30,
  IntervalEnemy: 60,
  IntervalJapariman: 240,
  IntervalServal: 360,
  IntervalCaracal: 480,
  IntervalRacoon: 600,
  IntervalFennec: 720,

  EventBoss: function(){
    var bss = new EnemyBossGate(BossGate);

    var shk1 = new EnemyShokushu(Shokushu);
    shk1.x = EnemyShokushuPosition[0].x;
    shk1.y = EnemyShokushuPosition[0].y;
    var shk2 = new EnemyShokushu(Shokushu);
    shk2.x = EnemyShokushuPosition[1].x;
    shk2.y = EnemyShokushuPosition[1].y;
  },

  EventMethod: function(){

    if(this.age % this.intervalEnemy == 0 && this.numberEnemy < this.numberEnemyMax){
          var enm = new Enemy(Cellien);
    }
  }
};

WaveObject[2] = {
  Number: 2,
  NumberEnemyMax: 15,
  NumberEnemyWhereBossCome: 10,
  IntervalWhenEventOccur: 30,
  IntervalEnemy: 30,
  IntervalJapariman: 240,
  IntervalServal: 360,
  IntervalCaracal: 480,
  IntervalRacoon: 600,
  IntervalFennec: 720,

  EventBoss: function(){
    var bss = new EnemyBossGate(BossGate);
    var shk1 = new EnemyShokushu(Shokushu);
    shk1.x = EnemyShokushuPosition[0].x;
    shk1.y = EnemyShokushuPosition[0].y;
    var shk2 = new EnemyShokushu(Shokushu);
    shk2.x = EnemyShokushuPosition[1].x;
    shk2.y = EnemyShokushuPosition[1].y;
  },

  EventMethod: function(){

    if(this.age % this.intervalEnemy == 0 && this.numberEnemy < this.numberEnemyMax){
          var enm = new Enemy(Cellien);
    }

    if(this.age % (this.intervalEnemy * 6) == 0 && this.numberEnemy < this.numberEnemyMax){
          var enm = new Enemy(RedCellien);
    }
  }
};

WaveObject[3] = {
  Number: 3,
  NumberEnemyMax: 15,
  NumberEnemyWhereBossCome: 10,
  IntervalWhenEventOccur: 30,
  IntervalEnemy: 30,
  IntervalJapariman: 240,
  IntervalServal: 360,
  IntervalCaracal: 480,
  IntervalRacoon: 600,
  IntervalFennec: 720,

  EventBoss: function(){
    var bss = new EnemyBossGate(BossGate);
    var shk1 = new EnemyShokushu(Shokushu);
    shk1.x = EnemyShokushuPosition[0].x;
    shk1.y = EnemyShokushuPosition[0].y;
    var shk2 = new EnemyShokushu(Shokushu);
    shk2.x = EnemyShokushuPosition[1].x;
    shk2.y = EnemyShokushuPosition[1].y;
    var shk3 = new EnemyShokushu(Shokushu);
    shk3.x = EnemyShokushuPosition[2].x;
    shk3.y = EnemyShokushuPosition[2].y;
    var shk4 = new EnemyShokushu(Shokushu);
    shk4.x = EnemyShokushuPosition[3].x;
    shk4.y = EnemyShokushuPosition[3].y;
  },

  EventMethod: function(){
    if(this.age % this.intervalEnemy == 0 && this.numberEnemy < this.numberEnemyMax - 1){
          var enm = new Enemy(Cellien);
          var enm2 = new Enemy(Cellien);
    }

    if(this.age % (this.intervalEnemy * 6) == 0 && this.numberEnemy < this.numberEnemyMax){
          var enm = new Enemy(RedCellien);
    }
  }
};



//二点間の距離
//return {number}
function distance(x, y, ox, oy){
  return Math.sqrt(Math.pow(x - ox, 2) + Math.pow(y - oy, 2));
}



//与えられた座標がゲームフィールドの中にあるか判定
//@param {number}x x座標
//@param {number}y y座標
//@return {Boolean} ゲームフィールドの中にあれば true
function isInGameField(x, y){
    if(x >= GameFieldX && x <= GameFieldRightX && y >= GameFieldY && y <= GameFieldRightY) {
      return true;
    } else {
      return false;
    }
}



//画面の周囲にスプライトを配置する座標を返す
//@param wid スプライトの width
//@param hei スプライトの height
//@return 座標 [x: {number}, y: {number}]
function answerPositionScreenAround(wid, hei){
  var ox = GameFieldX;
  var oy = GameFieldY;
  var fw = GameFieldRightX - GameFieldX;
  var fh = GameFieldRightY - GameFieldY;
  var width = fw - wid;
  var height = fh - ItembarHeight - hei;

  var val = Math.random() * (width * 2 + height * 2);
  if(val <= width){
    return {x: ox + val, y: oy};
  } else if(width < val && val <= width + height) {
    return {x: ox + width, y: oy + val - width};
  } else if(width + height < val && val <= width * 2 + height){
    return {x: ox + val - width - height, y: oy + height};
  } else {
    return {x: ox, y: oy + val - width * 2 - height};
  }
}


var ui;

var map;

//自機設定
var player;

//現在の敵の数
var numberEnemy = 0;
var numberJapariman = 0;

var wave;

var game;


//リロードボタン

var ReloadButton = enchant.Class.create(enchant.ui.Button, {
  initialize: function(){
    enchant.ui.Button.call(this, "もう一度", "blue", 64, 120);
    this.x = (GameScreenWidth - 64) / 2;
    this.y = 3 * (GameScreenHeight - 120) / 4;
  },

  ontouchstart: function(){
    console.log("aaa");
    game.popScene();
    game.onload();
  }
});


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

    //this.reloadButton = new ReloadButton();
    //this.addChild(this.reloadButton);
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



var Cutin = enchant.Class.create(enchant.Scene, {
    initialize: function(x, y, wid, hei, fn, wv){
      enchant.Scene.call(this);
      this.image = new enchant.Sprite(wid, hei);
      this.image.image = game.assets[fn];
      this.image.x = x;
      this.image.y = y;
      this.addChild(this.image);

      this.waveEffect = wv;

      this.image.isStopImage = false;

    },

    onenterframe: function(){
      if(this.image.isStopImage){
        game.popScene();
        this.waveEffect.call(wave);
        delete this;
      }
    }
});



var CutinServal = enchant.Class.create(Cutin, {
  initialize: function(){
    Cutin.call(this, CutinServalX, CutinServalY, CutinServalWidth, CutinServalHeight,
      CutinServalFilename, wave.doServal);

    this.image.tl.moveTo(50, 245, 20, enchant.Easing.QUAD_EASEOUT)
    .tween({y:150, scaleX: 2, scaleY: 2, opacity: 0, time: 50, easing: QUAD_EASEOUT})
    .then(function(){this.isStopImage = true;});
  }
});



var CutinCaracal = enchant.Class.create(Cutin, {
  initialize: function(){
    Cutin.call(this, CutinCaracalX, CutinCaracalY, CutinCaracalWidth, CutinCaracalHeight,
      CutinCaracalFilename, wave.doCaracal);

    this.image.tl.moveTo(70, 188, 20, enchant.Easing.QUAD_EASEOUT)
    .tween({y:150, scaleX: 2, scaleY: 2, opacity: 0, time: 50, easing: QUAD_EASEOUT})
    .then(function(){this.isStopImage = true;});
  }
});



var CutinRacoon = enchant.Class.create(Cutin, {
  initialize: function(){
    Cutin.call(this, CutinRacoonX, CutinRacoonY, CutinRacoonWidth, CutinRacoonHeight,
      CutinRacoonFilename, wave.doRacoon);

    this.image.tl.moveTo(120, 315, 20, enchant.Easing.QUAD_EASEOUT)
    .tween({x:50, y:150, scaleX: 3, scaleY: 3, opacity: 0, time: 50, easing: QUAD_EASEOUT})
    .then(function(){this.isStopImage = true;});
  }
});



var CutinFennec = enchant.Class.create(Cutin, {
  initialize: function(){
    Cutin.call(this, CutinFennecX, CutinFennecY, CutinFennecWidth, CutinFennecHeight,
      CutinFennecFilename, wave.doFennec);

    this.image.tl.moveTo(50, 365, 20, enchant.Easing.QUAD_EASEOUT)
    .tween({y:200, scaleX: 3, scaleY: 3, opacity: 0, time: 50, easing: QUAD_EASEOUT})
    .then(function(){this.isStopImage = true;});
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


var WaveClear = enchant.Class.create(enchant.Scene, {
  initialize: function(num){
    enchant.Scene.call(this);


    this.number = num;
    this.number++;

    var txt;

    if(this.number < WaveObject.length){
      txt = "Clear!";
    } else {
      txt = "Congratulations!";
    }

    this.text = new enchant.ui.MutableText(
      (GameScreenWidth - UIFontWidth * txt.length) / 2,
      (GameScreenHeight - UIFontWidth) / 2,
      UIFontWidth * txt.length
    );
    this.text.text = txt;
    this.addChild(this.text);
  },

  ontouchstart: function(){
    if(this.number < WaveObject.length){
      game.popScene();
      game.pushScene(new WaveInformation(this.number));
      delete this;
    }
  }
});



var Wave = enchant.Class.create(enchant.Node, {
  initialize: function(obj){
    enchant.Node.call(this);

    this.number = obj["Number"];

    this.numberEnemyMax = obj["NumberEnemyMax"];
    this.numberEnemy = 0;
    this.intervalEnemy = obj["IntervalEnemy"];
    this.numberEnemyWhereBossCome = obj["NumberEnemyWhereBossCome"];
    this.isBossHaveCome = false;
    this.isBossDestroyed = false;

    this.intervalWhenEventOccur = obj["IntervalWhenEventOccur"];

    this.isRacoon = false;

    this.numberJapariman = 0;
    this.numberJaparimanMax = 1;
    this.intervalJapariman = obj["IntervalJapariman"];

    this.numberServal = 0;
    this.numberServalMax = 1;
    this.intervalServal = obj["IntervalServal"];

    this.numberCaracal = 0;
    this.numberCaracalMax = 1;
    this.intervalCaracal = obj["IntervalCaracal"];

    this.numberRacoon = 0;
    this.numberRacoonMax = 1;
    this.intervalRacoon = obj["IntervalRacoon"];

    this.numberFennec = 0;
    this.numberFennecMax = 1;
    this.intervalFennec = obj["IntervalFennec"];

    this.isEnemyAnihilated = false;
    this.isEnemyStop = false;

    this.isReadyToGoNextWave = false;

    this.wait = 0;

    this.enabled = true;

    this.eventMethod = obj["EventMethod"];
    this.eventBoss = obj["EventBoss"];

    game.rootScene.addChild(this);
  },
  onenterframe: function(){
    if(!this.enabled) return;

    if(this.wait > 0) return --this.wait;

    if(this.isReadyToGoNextWave){
      this.enabled = false;
      game.pushScene(new WaveClear(wave.number));
      this.end();
    }

    if(this.isBossDestroyed){
      this.isReadyToGoNextWave = true;
      this.isEnemyAnihilated = true;
      this.wait = WaveClearWait;
    }

    if(this.numberEnemyWhereBossCome < 0 && this.isBossHaveCome == false){
      this.eventBoss();
      this.isBossHaveCome = true;
    }

    if(this.numberJapariman < 1 && this.age % this.intervalJapariman == 0){
        var jpr = new Japariman();
    }
    if(this.numberServal < 1 && this.age % this.intervalServal == 0)
        var jpr = new Serval();

    if(this.numberCaracal < 1 && this.age % this.intervalCaracal == 0)
        var jpr = new Caracal();

    if(this.numberRacoon < 1 && this.age % this.intervalRacoon == 0)
        var jpr = new Racoon();

    if(this.numberFennec < 1 && this.age % this.intervalFennec == 0)
        var jpr = new Fennec();


    if(this.age % this.intervalWhenEventOccur == 0){
      this.eventMethod();
    }
  },
  end: function(){
    this.finalize();
    game.rootScene.removeChild(this);
    delete this;
  },
  eventMethod: function(){},

  eventBoss: function(){},

  doServal: function(){
    player.serval = false;
    player.attackIntervalBufWait = PlayerAttackIntervalBufWait;
  },

  doCaracal: function(){
    player.caracal = false;
    player.attackBufWait = PlayerAttackBufWait;
  },

  doRacoon: function(){
    player.racoon = false;
    player.invincibleWait = PlayerInvincibleWait;
  },

  doFennec: function(){
    player.fennec = false;
    player.recoverHP(PlayerHP);
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
    this.attackBufWait = 0;
    this.attackIntervalBufWait = 0;

    this.invincibleWait = 0;

    this.damageEffect = game.assets[PlayerDamageEffectFilename];

    this.score = 0;

    this.serval = false;
    this.caracal = false;
    this.racoon = false;
    this.fennec = false;

    this.enabled = true;

    this.speed = PlayerSpeed;
    game.rootScene.addChild(this);
  },

  onenterframe: function(){
    if(player.attackIntervalBufWait > 0){
      player.attackInterval = PlayerAttackIntervalBuffed;
      player.attackIntervalBufWait--;
    } else {
      player.attackInterval = PlayerAttackInterval;
    }

    if(player.attackBufWait > 0){
      player.attack = PlayerAttackBuffed;
      player.attackBufWait--;
    } else {
      player.attack = PlayerAttack;
    }

    if(this.invincibleWait > 0){
      this.invincibleWait--;
    }

    this.attackDelay++;
  },

  move: function(x, y){
    if(this.enabled){
      var dx = x - (this.width / 2);
      var dy = y - (this.height / 2);
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
    if(this.invincibleWait > 0) return;
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

    var pos = answerPositionScreenAround(this.width, this.height);
    this.x = pos.x;
    this.y = pos.y;
    this.speed = JaparimanSpeed;

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

  move: function(){
    if(game.frame % this.speed != 0) return;
    var dx = JaparimanMoveDX;
    var dy = JaparimanMoveDY;
    if(this.x + this.width > GameFieldRightX || (this.x > 0 && Math.random() > 0.5)) dx = -dx;
    if(this.y + this.height > GameFieldRightY || (this.y > 0 && Math.random() > 0.5)) dy = -dy;

    this.tl.moveBy(dx, dy, this.speed, enchant.Easing.LINEAR);
  },

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
    wave.numberJapariman++;
  },

  ontouchplayer: function(){
    player.recoverHP(JaparimanRecoverHP);
  },

  finalize: function(){
    wave.numberJapariman--;
  }
});



var Serval = enchant.Class.create(Item, {
  initialize: function(){
    Item.call(this, ServalWidth, ServalHeight, ServalFilename);
    wave.numberServal++;
  },

  ontouchplayer: function(){
    player.serval = true;
  },

  finalize: function(){
    wave.numberServal--;
  }
});



var Caracal = enchant.Class.create(Item, {
  initialize: function(){
    Item.call(this, CaracalWidth, CaracalHeight, CaracalFilename);
    wave.numberCaracal++;
  },

  ontouchplayer: function(){
    player.caracal = true;
  },

  finalize: function(){
    wave.numberCaracal--;
  }
});



var Racoon = enchant.Class.create(Item, {
  initialize: function(){
    Item.call(this, RacoonWidth, RacoonHeight, RacoonFilename);
    wave.numberRacoon++;
  },

  ontouchplayer: function(){
    player.racoon = true;
  },

  finalize: function(){
    wave.numberRacoon--;
  }
});



var Fennec = enchant.Class.create(Item, {
  initialize: function(){
    Item.call(this, FennecWidth, FennecHeight, FennecFilename);
    wave.numberFennec++;
  },

  ontouchplayer: function(){
    player.fennec = true;
  },

  finalize: function(){
    wave.numberFennec--;
  }
});



var Enemy = enchant.Class.create(enchant.Sprite, {
  initialize: function(obj){
    enchant.Sprite.call(this, obj["ImageWidth"], obj["ImageHeight"]);
    this.image = game.assets[obj["ImageFilename"]];
    this.frame = 0;
    var pos = this.answerPosition();
    this.x = pos.x;
    this.y = pos.y;
    this.speed = obj["Speed"];

    this.hp = obj["HP"];
    this.attack = obj["Attack"];
    this.attackDelay = 0;
    this.attackInterval = obj["AttackInterval"];

    this.score = obj["Score"];

    this.isToMove = false;
    this.moveToX = 0;
    this.moveToY = 0;
    this.moveInterval = obj["MoveInterval"];

    this.isToRemoved = false;

    this.enabled = true;

    this.opacity = 0;
    this.tl.tween({opacity: 1, time:10, easing: LINEAR});

    game.rootScene.insertBefore(this, player);

    wave.numberEnemy++;
    wave.numberEnemyWhereBossCome--;
  },

  onenterframe: function(){
    if(!this.enabled) return;

    if(this.isToRemoved){
      this.remove();
    }

    if(wave.isEnemyAnihilated){
      this.isToRemoved = true;
    }

    if(this.isToRemoved) return;

    if(this.age % this.moveInterval == 0) {
      this.move();
    }

    if(this.intersect(player)){
      this.ontouchplayer();
    }

    this.attackDelay++;
  },

  ontouchplayer: function(){
    this.attackByEnemy();
    this.attackByPlayer();
  },

  attackByEnemy: function(){
    if(this.age % this.attackInterval == 0) {
      player.damageHP(this.attack);

      var snd = player.damageEffect.clone();
      snd.play();
    }
  },

  attackByPlayer: function(){
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
    this.removeImmediately();
  },

  removeImmediately: function(){
    this.finalize();
    player.gainScore(this.score);

    var bmb = new Bomb(this.x + (this.width - BombWidth), this.y + (this.height - BombHeight));

    game.rootScene.removeChild(this);
    delete this;

    wave.numberEnemy--;
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



var EnemyShokushu = enchant.Class.create(Enemy, {
  initialize: function(obj){
    Enemy.call(this, obj);

  },

  ontouchplayer: function(){
    this.attackByEnemy();
  },

  move: function(){
    if(Math.random() < 0.5) return;

    this.originX = this.x;
    this.originY = this.y;

    this.tl.moveTo(player.x, player.y, this.speed, enchant.Easing.QUAD_EASEOUT)
    .moveTo(this.originX, this.originY, this.speed, enchant.Easing.LINEAR);
  },

  answerPosition: function(){
    return {x: 0, y: 0};
  }
});



var EnemyBossGate = enchant.Class.create(Enemy, {
  initialize: function(obj){
    Enemy.call(this, obj);

    this.waitRemoving = 60;
  },

  move: function(){},

  ontouchplayer: function(){
    this.attackByPlayer();
  },

  remove: function(){
    wave.isBossDestroyed = true;

    if(this.waitRemoving > 0){
      this.doRemoving();
      this.waitRemoving--;
    } else {
      this.removeImmediately();
    }

  },

  doRemoving: function(){
    if(this.age % EnemyBombWait == 0){
      var x = this.x + Math.random() * this.width;
      var y = this.y + Math.random() * this.height;
      var bmb = new Bomb(x, y);
    }
  },

  answerPosition: function(){
    return {
      x: (GameFieldRightX - GameFieldX - this.width) / 2,
      y: GameFieldY
    };
  },

  damageHP: function(val){
    this.hp -= val;
    if(this.hp <= 0) {
      this.isToRemoved = true;
    }
  },

  finalize: function(){
  }
});



var ButtonItem = enchant.Class.create(enchant.Sprite,{
  initialize: function(x, y, wid, hei, fn){
    enchant.Sprite.call(this, wid, hei);
    this.image = game.assets[fn];
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.enabled = false;
  },

  ontouchstart: function(ev){
    if(this.enabled){
      this.cutin();
    }
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
    this.itembar.x = ItembarX;
    this.itembar.y = ItembarY;
    this.addChild(this.itembar);

    this.itemServal = new ButtonItem(ServalX, ServalY, ServalWidth, ServalHeight, ServalFilename);
    this.itemServal.cutin = function(){game.pushScene(new CutinServal());};
    this.itemServal.effect = wave.doServal;
    this.addChild(this.itemServal);


    this.itemCaracal = new ButtonItem(CaracalX, CaracalY, CaracalWidth, CaracalHeight, CaracalFilename);
    this.itemCaracal.cutin = function(){game.pushScene(new CutinCaracal());};
    this.itemCaracal.effect = wave.doCaracal;
    this.addChild(this.itemCaracal);

    this.itemRacoon = new ButtonItem(RacoonX, RacoonY, RacoonWidth, RacoonHeight, RacoonFilename);
    this.itemRacoon.cutin = function(){game.pushScene(new CutinRacoon());};
    this.itemRacoon.effect = wave.doRacoon;
    this.addChild(this.itemRacoon);

    this.itemFennec = new ButtonItem(FennecX, FennecY, FennecWidth, FennecHeight, FennecFilename);
    this.itemFennec.cutin = function(){game.pushScene(new CutinFennec());};
    this.itemFennec.effect = wave.doFennec;
    this.addChild(this.itemFennec);

    game.rootScene.addChild(this);
  },

  onenterframe: function(){
    this.playerHPBar.value = player.hp;
    this.score.text = player.score.toString();

    if(!player.serval){
      this.itemServal.opacity = ItemFalseOpacity;
      this.itemServal.enabled = false;
    } else {
      this.itemServal.opacity = ItemTrueOpacity;
      this.itemServal.enabled = true;
    }

    if(!player.caracal){
      this.itemCaracal.opacity = ItemFalseOpacity;
      this.itemCaracal.enabled = false;
    } else {
      this.itemCaracal.opacity = ItemTrueOpacity;
      this.itemCaracal.enabled = true;
    }

    if(!player.racoon){
      this.itemRacoon.opacity = ItemFalseOpacity;
      this.itemRacoon.enabled = false;
    } else {
      this.itemRacoon.opacity = ItemTrueOpacity;
      this.itemRacoon.enabled = true;
    }

    if(!player.fennec){
      this.itemFennec.opacity = ItemFalseOpacity;
      this.itemFennec.enabled = false;
    } else {
      this.itemFennec.opacity = ItemTrueOpacity;
      this.itemFennec.enabled = true;
    }

  }
});




window.onload = function(){
  game = new enchant.Core(GameScreenWidth, GameScreenHeight);
  game.fps = GameFPS;

  game.preload(PlayerImageFilename);

  game.preload(ServalFilename);
  game.preload(CaracalFilename);
  game.preload(RacoonFilename);
  game.preload(FennecFilename);
  game.preload(JaparimanImageFilename);

  game.preload(CutinServalFilename);
  game.preload(CutinCaracalFilename);
  game.preload(CutinRacoonFilename);
  game.preload(CutinFennecFilename);

  game.preload(UIPlayerHPBarImageFilename);

  game.preload(MapFilename);

  game.preload(PlayerAttackImageFilename);
  game.preload(BombFilename);
  game.preload(ItembarFilename);

  game.preload(EnemyImageFilename);
  game.preload(BossGate.ImageFilename);
  game.preload(Shokushu.ImageFilename);
  game.preload(ShokushuReverseFilename);
  game.preload(RedCellien.ImageFilename);

  game.preload(PlayerAttackEffectFilename);
  game.preload(PlayerDamageEffectFilename);
  game.preload(EnemyRemoveEffectFilename);
  game.preload(ItemGetEffectFilename);


  game.onload = function(){

    //自機インスタンス
    player = new Player();

    wave = new Wave(0);

    ui = new UI();

    map = new enchant.Map(MapWidth, MapWidth);
    map.image = game.assets[MapFilename];
    map.loadData(MapDataSavanna);
    game.rootScene.insertBefore(map, player);


    function beginPlayerMove(ev){
      if(isInGameField(ev.x, ev.y)){
        player.move(ev.x, ev.y);
      }
    }

    //自機移動リスナ登録
    game.rootScene.on("touchstart", beginPlayerMove);

    game.pushScene(new OpeningScene());
  };


  game.start();
};
