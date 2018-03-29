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
var PlayerAttackImageFrame = [0, 1, 2, 3, null];
var PlayerHP = 100;

var EnemyImageWidth = 32;
var EnemyImageHeight = 32;
var EnemyImageFilename = "./image/enemy.png";
var EnemySpeed = 5;
var EnemyMax = 30; //the max number of the enemies
var EnemyInterval = GameFPS * 2;
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
var player = null;
var playerAttack = null; //自機の攻撃アニメーション

//敵設定
var enemy = [];
for(var i = 0; i < EnemyMax; i++){
  enemy[i] = null;
}

var wave = [];


window.onload = function(){
  var game = new enchant.Core(GameScreenWidth, GameScreenHeight);
  game.fps = GameFPS;

  game.preload(PlayerImageFilename);
  game.preload(EnemyImageFilename);

  game.onload = function(){
    //自機設定
    player = new enchant.Sprite(PlayerImageWidth, PlayerImageHeight);
    player.image = game.assets[PlayerImageFilename];
    player.x = (GameScreenWidth - PlayerImageWidth) / 2;
    player.y = (GameScreenHeight - PlayerImageHeight) / 2;
    player.frame = 0;
    player.hp = PlayerHP;
    player.attack = PlayerAttack;
    player.attackDelay = 0;
    game.rootScene.addChild(player);

    playerAttack = new enchant.Sprite(PlayerAttackImageWidth, PlayerAttackImageHeight);
    playerAttack.visible = false;
    playerAttack.frame = PlayerAttackImageFrame;
    game.rootScene.addChild(playerAttack);

    //自機移動リスナ登録
    game.rootScene.on("touchstart", function(ev){
        if(PlayerEnabled){
          var dx = ev.x - (PlayerImageWidth / 2);
          var dy = ev.y - (PlayerImageHeight / 2);
          var frm = distance(dx, dy, player.x, player.y) / PlayerSpeed;
          player.tl.clear();
          player.tl.moveTo(dx, dy, frm, enchant.Easing.LINEAR);
        }
    });


    //通常敵（Enemy）設定
    function addEnemy(idx){
      enemy[idx] = new enchant.Sprite(EnemyImageWidth, EnemyImageHeight);
      enemy[idx].image = game.assets[EnemyImageFilename];
      enemy[idx].frame = 0;
      enemy[idx].hp = EnemyHP;
      enemy[idx].attack = EnemyAttack;
      var pos = setEnemyPosition();
      enemy[idx].x = pos.x;
      enemy[idx].y = pos.y;
      enemy[idx].attackDelay = 0;
      game.rootScene.insertBefore(enemy[idx], player);
      console.log("enemy[" + idx + "] added.");
    }

    function removeEnemy(idx){
      game.rootScene.removeChild(enemy[idx]);
      delete enemy[idx];
      enemy[idx] = null;
      console.log("enemy[" + idx + "] removed.");
    }

    //Wave n での敵の行動
    wave[0] = function(){
        if(game.frame % EnemyInterval == 0){
          for(var i = 0; i < EnemyMax; i++){
            if(enemy[i] === null){
              addEnemy(i);
              break;
            } else {
              enemy[i].tl.clear();
              enemy[i].tl.moveTo(player.x, player.y,
                distance(enemy[i].x, enemy[i].y, player.x, player.y) / EnemySpeed,
                enchant.Easing.LINEAR);
            }
          }
        }
    }

    //Wave 1 での敵の行動リスナ登録
    game.rootScene.on("enterframe", wave[0]);

    //プレイヤの攻撃リスナ登録
    game.rootScene.on("enterframe", function(){
      if(player.attackDelay >= PlayerAttackInterval){
        for(var i = 0; i < EnemyMax; i++){
          if(enemy[i] !== null && player.intersect(enemy[i])){
            enemy[i].hp -= player.attack;

            playerAttack.x = (player.x + enemy[i].x) / 2;
            playerAttack.y = (player.y + enemy[i].y) / 2;
            playerAttack.frame = PlayerAttackImageFrame;
            playerAttack.visible = true;

            console.log(player.attackDelay);
            player.attackDelay = 0;

            if(enemy[i].hp <= 0){
              removeEnemy(i);
            }

            break;
          }

        }
      }
    });

    //            player.hp -= enemy[i].attack;

    //フレーム毎の処理一般
    game.rootScene.on("enterframe", function(){
      player.attackDelay++;
      for(var i = 0; i < EnemyMax; i++){
        if(enemy[i] !== null){
          enemy[i].attackDelay++;
        }
      }
    });

  };

  game.start();
};
