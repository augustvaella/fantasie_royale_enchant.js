enchant();
window.onload = function(){
  var game = new Core(375, 667);
  /*
  //core.preload('001.jpg');
  core.onload = function(){
    /*
    var card = new Sprite(453, 640);
    card.image = game.assets['001.jpg'];
    card.x = 0;
    card.y = 0;
    core.rootScene.addChild(card);
  };
  */

  game.start();
};
