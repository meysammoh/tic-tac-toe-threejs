var THREE =require('three');

function Marker(position, marker_type) {
  var result = false;
  var tcolor = 0x00ffff;
  if (marker_type === 1)
    tcolor = 0x053344;
  var geometry = new THREE.BoxGeometry(.2, .2, .2);
  geometry.translate( position.x, position.y, -.5);

  var material = new THREE.MeshBasicMaterial({ color: tcolor });
  this.mesh = new THREE.Mesh(geometry, material);
}

module.exports = Marker;