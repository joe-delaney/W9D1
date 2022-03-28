const Util = require("./utils");

function MovingObject(options) {
  this.pos = options["pos"];
  this.vel = options["vel"];
  this.radius = options["radius"];
  this.color = options["color"];
  this.game = options["game"];
}

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos = this.game.wrap(this.pos);
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  if(Util.distance(this.pos, otherObject.pos) < (this.radius + otherObject.radius)){
    return true;
  } else {
    return false;
  }
};

MovingObject.prototype.collideWith = function(otherObject) {
  // this.game.remove(otherObject);
  // this.game.remove(this);
};

module.exports = MovingObject;