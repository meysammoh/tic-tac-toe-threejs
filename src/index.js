var ThreeHelper = require('./threehelper');
var Game = require('./game');

var threeHelper = new ThreeHelper();
var game = new Game(threeHelper);

threeHelper.renderer.domElement.addEventListener("click", game.onclick, true);
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

  threeHelper.camera.aspect = window.innerWidth / window.innerHeight;
  threeHelper.camera.updateProjectionMatrix();

  threeHelper.renderer.setSize(window.innerWidth, window.innerHeight);
  threeHelper.draw();
}

game.DrawBoard();
game.setTurn();
