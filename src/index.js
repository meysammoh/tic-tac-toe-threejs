import * as THREE from 'three';
import _ from 'lodash';

var turn = 0;
var finished = false;
var blocks = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1]
];

var blockArray = [];
var markersArray = [];
var loader = new THREE.FontLoader();
var myfont = null;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

var scene = new THREE.Scene();

var loader = new THREE.FontLoader();
loader.load('../fonts/helvetiker_regular.typeface.json', function (font) {
  myfont = font;

});
renderer.domElement.addEventListener("click", onclick, true);
function onclick(event) {
  if (turn == 0 && !finished) {
    var selectedObject;
    var raycaster = new THREE.Raycaster();

    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(blockArray, true); //array
    if (intersects.length > 0) {
      selectedObject = intersects[0];

      var res = AddMarker(intersects[0].object.geometry);
      if (res && !finished)
        playAI();
    }
  }
}

DrawBoard();
setTurn();
function setTurn() {
  turn = Math.floor(Math.random() * 2);

  if (turn == 1)
    playAI();
}
function DrawBoard() {
  var initX = -2;
  var X = initX, Y = 2;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var geometry = new THREE.BoxGeometry(.5, .5, .5);
      geometry.translate(X, Y, 0);
      geometry.position = new THREE.Vector3(X, Y, 0);
      geometry.name = i * 3 + j;
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      blockArray.push(cube);
      X += 1;
    }
    X = initX;
    Y -= 1;
  }

  renderer.render(scene, camera);

}

function AddMarker(block) {
  var result = false;
  var tcolor = 0x00ffff;
  if (turn === 1)
    tcolor = 0x053344;
  var geometry = new THREE.BoxGeometry(.2, .2, .2);
  geometry.translate(block.position.x, block.position.y, 1);

  var material = new THREE.MeshBasicMaterial({ color: tcolor });
  var cube = new THREE.Mesh(geometry, material);
  var r = Math.floor(block.name / 3);
  var c = block.name % 3;
  if (blocks[r][c] == -1) {
    blocks[r][c] = turn;
    markersArray.push(cube);
    scene.add(cube);
    renderer.render(scene, camera);
    turn = (turn + 1) % 2;
    checkWinCondition();
    result = true;
  }
  return result;
}

function checkWinCondition() {

  var winner = -1;
  for (var i = 0; i < 3; i++) {

    if (blocks[i][0] == blocks[i][1] && blocks[i][1] == blocks[i][2]) {
      winner = blocks[i][0];
      break;
    }
    if (blocks[0][i] == blocks[1][i] && blocks[1][i] == blocks[2][i]) {
      winner = blocks[0][i];
      break;
    }
  }
  if (winner < 0) {
    if (blocks[0][0] == blocks[1][1] && blocks[1][1] == blocks[2][2])
      winner = blocks[0][0];
    else if (blocks[2][0] == blocks[1][1] && blocks[1][1] == blocks[0][2])
      winner = blocks[2][0];
  }
  var text = "";
  if (winner < 0 && markersArray.length == 9) {
    text = "Draw!";
    finished = true;
  }
  else if (winner == 0) {
    text = "Player wins!";
    finished = true;
  }
  else if (winner == 1) {
    text = "Computer wins!";
    finished = true;
  }
  if (text !== "") {
    var geometry = new THREE.TextGeometry(text, {
      font: myfont,
      size: 1,
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
    scene.add(mesh);
    renderer.render(scene, camera);
  }
}

function playAI() {
  var availableBlocks = [];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (blocks[i][j] === -1) {
        availableBlocks.push(i * 3 + j);
      }
    }
  }

  var selected = Math.floor(Math.random() * availableBlocks.length);
  console.log(" AI " + availableBlocks[selected]);
  AddMarker(blockArray[availableBlocks[selected]].geometry);
}