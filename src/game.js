var Board = require('./board');
var Marker = require('./marker');
var THREE = require('three');

function Game(threeHelper) {

  this.threeHelper = threeHelper;
  var self = this;
  this.turn = 0;
  this.board = new Board(this.threeHelper);
  

  this.onclick = function (event) {
    if (self.turn == 0 && !self.board.finished) {

      var selectedObject;
      var raycaster = new THREE.Raycaster();

      var mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, threeHelper.camera);
      var intersects = raycaster.intersectObjects(self.board.blockArray, true);
      if (intersects.length > 0) {

        selectedObject = intersects[0];
        var res = self.board.addMarker(intersects[0].object.geometry, self.turn);
        if (res && !self.board.finished){
          self.changeTurn();
          self.playAI();

        }
      }
    }
  }


  this.setTurn = function () {
    this.turn = Math.floor(Math.random() * 2);
    if (this.turn == 1)
      this.playAI();
  }
  this.DrawBoard = function () {
    this.board.initialize();
    this.threeHelper.draw();
  }

  this.playAI = function () {
    var availableBlocks = [];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (this.board.blocks[i][j] === -1) {
          availableBlocks.push(i * 3 + j);
        }
      }
    }

    var selected = Math.floor(Math.random() * availableBlocks.length);
    console.log(" AI " + availableBlocks[selected]);
    if( this.board.addMarker(this.board.blockArray[availableBlocks[selected]].geometry, this.turn)){
      this.changeTurn();
    }
  }

  this.changeTurn = function(){
    this.turn = (this.turn + 1) % 2;
  }
}



module.exports = Game;