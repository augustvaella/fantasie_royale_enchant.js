enchant();
window.onload = function(){
  var game = new Core(375, 667);
  game.fps = 30;

  game.preload('001.jpg');
  game.onload = function(){
    var card = new Sprite(453, 640);
    card.image = game.assets['001.jpg'];
    card.x = 0;
    card.y = 0;
    card.frame = 0;
    game.rootScene.addChild(card);
  };

  game.start();
};
