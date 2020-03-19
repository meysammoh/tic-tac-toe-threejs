var THREE = require('three');

function Animation(startDelay, animate) {
  var clock = new THREE.Clock();
  this.delta = clock.getDelta()
  this.startDelay = startDelay;
  this.isFinished = false;
  this.animate = animate;

  this.stepForward = function(){
    
    if(this.delta > this.startDelay){
      
      this.isFinished = this.animate();
    }
    this.delta+=clock.getDelta();
  }
}

module.exports = Animation;
