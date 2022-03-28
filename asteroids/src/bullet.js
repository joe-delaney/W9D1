const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");

function Bullet(options) {
  let vel;
  if(options["vel"][0] === 0 && options["vel"][1] === 0) {
    vel = [0,-4];
  } else {
    vel = options["vel"];
  }
  MovingObject.call(this, {
    pos: options["pos"],
    vel: vel,
    radius: Bullet.RADIUS,
    color: Bullet.COLOR,
    game: options["game"]
  });
}

Util.inherits(Bullet, MovingObject);

Bullet.RADIUS = 5;
Bullet.COLOR = "yellow";

module.exports = Bullet;