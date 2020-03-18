var THREE = require('three');

function ThreeHelper() {
  this.self = this;
  this.loader = new THREE.FontLoader();
  this.myfont = null;

  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(this.renderer.domElement);

  this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
  this.camera.position.set(0, 0, 10);
  this.camera.lookAt(0, 0, 0);

  this.scene = new THREE.Scene();
  this.scene.background = new THREE.Color( 0xffffff );
  
  var ambientLight = new THREE.AmbientLight ( 0xffffff, .5);
  this.scene.add( ambientLight );

  var pointLight = new THREE.PointLight( 0xffffff, 1 );
  pointLight.position.set( 0, 10, 5 );
  this.scene.add( pointLight );

  this.loader = new THREE.FontLoader();
  this.loader.load('../fonts/helvetiker_regular.typeface.json', function (font) {
    myfont = font;

  });
  this.draw = function () {
    this.renderer.render(this.scene, this.camera);
  }

  this.getBottomRightAtZ = function () {
    
    return this.map2DToWorld( window.innerWidth,window.innerHeight, 0);
  }
  this.getLeftTopAtZ = function () {
    
    return this.map2DToWorld( 0,0, 0);
  }
    this.map2DToWorld = function( pointX, pointY, Z){
    var vec = new THREE.Vector3(); // create once and reuse
    var pos = new THREE.Vector3(); // create once and reuse

    vec.set(
      (pointX/ window.innerWidth) * 2 - 1,
      - (pointY / window.innerHeight) * 2 + 1,
      Z);

    vec.unproject(this.camera);

    vec.sub(this.camera.position).normalize();

    var distance = - this.camera.position.z / vec.z;

    pos.copy(this.camera.position).add(vec.multiplyScalar(distance));
    return pos;
  }


}

module.exports = ThreeHelper;