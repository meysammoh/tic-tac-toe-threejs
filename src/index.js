var ThreeHelper = require('./threehelper');
var Game = require('./game');

var threeHelper = new ThreeHelper();
var game = new Game(threeHelper);

 threeHelper.renderer.domElement.addEventListener("click", game.onclick, true);

 game.DrawBoard();
 game.setTurn();
