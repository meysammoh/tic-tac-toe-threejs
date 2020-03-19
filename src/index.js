var ThreeHelper = require('./threehelper');
var Game = require('./game');

var game= null;
var threeHelper = new ThreeHelper();

window.addEventListener('resize', onWindowResize, false);

startNewGame();

function onWindowResize() {

  threeHelper.camera.aspect = window.innerWidth / window.innerHeight;
  threeHelper.camera.updateProjectionMatrix();

  threeHelper.renderer.setSize(window.innerWidth, window.innerHeight);
  threeHelper.draw();
}

document.getElementById("ui_main").style.display = "none";
document.getElementById("btn_restart").onclick = function() {
  console.log("Restarting...");
  startNewGame();
  document.getElementById("ui_main").style.display = "none";
}

function startNewGame(){
  threeHelper.deleteEverything();
  let playerScore =0 , computerScore = 0;
  if(game !== null){
    threeHelper.renderer.domElement.removeEventListener('click', game.onclick, true);
    playerScore = game.playerScore;
    computerScore = game.computerScore;
  }
  game = new Game(threeHelper);
  game.playerScore = playerScore;
  game.computerScore = computerScore;
  threeHelper.renderer.domElement.addEventListener("click", game.onclick, true);
  game.DrawBoard();
  game.setTurn();
}