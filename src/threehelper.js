var THREE =require('three');

function ThreeHelper() {
  this.loader = new THREE.FontLoader();
  this.myfont = null;
  
  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(this.renderer.domElement);
  
  this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  this.camera.position.set(0, 0, 10);
  this.camera.lookAt(0, 0, 0);
  
  this.scene = new THREE.Scene();
  
  this.loader = new THREE.FontLoader();
  this.loader.load('../fonts/helvetiker_regular.typeface.json', function (font) {
    myfont = font;
  
  });
  this.draw = function(){
    this.renderer.render(this.scene, this.camera);
  }
}

module.exports = ThreeHelper;