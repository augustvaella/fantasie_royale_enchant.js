enchant();

var GameScreenWidth = 320;
var GameScreenHeight = 600;

var PlayerImageWidth = 32;
var PlayerImageHeight = 40;
var PlayerImageFilename = "./image/player.png";
var PlayerSpeed = 10;
var PlayerEnabled = true;

var EnemyImageWidth = 32;
var EnemyImageHeight = 32;
var EnemyImageFilename = "./image/enemy.png";
var EnemySpeed = 10;

window.onload = function(){
  var game = new enchant.Core(GameScreenWidth, GameScreenHeight);
  game.fps = 30;

  game.preload(PlayerImageFilename);
  game.onload = function(){
    var player = new enchant.Sprite(PlayerImageWidth, PlayerImageHeight);
    player.image = game.assets[PlayerImageFilename];
    player.x = (GameScreenWidth - PlayerImageWidth) / 2;
    player.y = (GameScreenHeight - PlayerImageHeight) / 2;
    player.frame = 0;
    game.rootScene.addChild(player);

    function move(ev){
        if(PlayerEnabled){
          var dx = -(PlayerImageWidth / 2) + ev.x - player.x;
          var dy = -(PlayerImageHeight / 2) + ev.y - player.y;
          var frm = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / PlayerSpeed;
          player.tl.clear();
          player.tl.moveBy(dx, dy, frm, enchant.Easing.LINEAR);
        }
    }
    game.rootScene.on("touchstart", move);
  };

  game.start();
};
