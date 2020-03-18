var THREE = require('three');
var Marker = require('./marker');

function Board(threeHelper) {
  
  this.initX = -.95;
  this.threeHelper = threeHelper;
  this.blockArray = [];
  this.markersArray = [];
  this.blocks = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
  ];
  this.finished = false;

  this.initialize = function () {
    
    var topLeft = this.threeHelper.getLeftTopAtZ();
    var bottomRight = this.threeHelper.getBottomRightAtZ();

    var W = bottomRight.x - topLeft.x;
    var H = topLeft.y - bottomRight.y ;
    var edge = W>H ? H : W;
    edge *=.7;
    var space = edge * .2;
    var blockEdge = edge*.8/3;

    this.initX = topLeft.x + (W - edge)/2;
    var X = this.initX, Y = topLeft.y - (H-edge)/2;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var geometry = new THREE.BoxGeometry(blockEdge, blockEdge, -.2);
        geometry.translate(X, Y, 0);
        geometry.position = new THREE.Vector3(X, Y, 0);
        geometry.name = i * 3 + j;
        var material = new THREE.MeshStandardMaterial({ color: 0xff0051 });
        var cube = new THREE.Mesh(geometry, material);
        threeHelper.scene.add(cube);
        this.blockArray.push(cube);
        X += blockEdge+space;
      }
      X = this.initX;
      Y -= (blockEdge+space);
    }
  }

  this.isBlockEmpty = function(r,c){
    return this.blocks[r][c] == -1;
  }

  this.addMarker = function (block, turn) {
    var result = false;
    var marker = new Marker(block.position, turn);

    var r = Math.floor(block.name / 3);
    var c = block.name % 3;
    if ( this.isBlockEmpty(r,c) ) {
      
      this.blocks[r][c] = turn;
      this.markersArray.push(marker.mesh);
      this.threeHelper.scene.add(marker.mesh);
      this.threeHelper.renderer.render(this.threeHelper.scene, this.threeHelper.camera);
      this.turn = (turn + 1) % 2;
      this.checkWinCondition();
      result = true;
    }
    return result;
  }

  this.checkWinCondition = function () {
    var winner = -1;
    for (var i = 0; i < 3; i++) {

      if (this.blocks[i][0] == this.blocks[i][1] && this.blocks[i][1] == this.blocks[i][2]) {
        winner = this.blocks[i][0];
        break;
      }
      if (this.blocks[0][i] == this.blocks[1][i] && this.blocks[1][i] == this.blocks[2][i]) {
        winner = this.blocks[0][i];
        break;
      }
    }
    if (winner < 0) {
      if (this.blocks[0][0] == this.blocks[1][1] && this.blocks[1][1] == this.blocks[2][2])
        winner = this.blocks[0][0];
      else if (this.blocks[2][0] == this.blocks[1][1] && this.blocks[1][1] == this.blocks[0][2])
        winner = this.blocks[2][0];
    }
    var text = "";
    if (winner < 0 && this.markersArray.length == 9) {
      text = "Draw!";
      this.finished = true;
    }
    else if (winner == 0) {
      text = "Player wins!";
      this.finished = true;
    }
    else if (winner == 1) {
      text = "Computer wins!";
      this.finished = true;
    }
    if (text !== "") {
      var geometry = new THREE.TextGeometry(text, {
        font: myfont,
        size: .5,
        height: 0.5,
        curveSegments: 4,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.05,
        bevelSegments: 3
      });
      geometry.center();

      var material = new THREE.MeshNormalMaterial();
      var mesh = new THREE.Mesh(geometry, material);
      this.threeHelper.scene.add(mesh);
      this.threeHelper.draw();
    }
  }

}

module.exports = Board;