const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");

function Asteroid(options) {
  MovingObject.call(this, {
    pos: options["pos"],
    vel: Util.randomVec(10),
    radius: Asteroid.RADIUS,
    color: Asteroid.COLOR
  });
}

Util.inherits(Asteroid, MovingObject);

Asteroid.COLOR = "red";
Asteroid.RADIUS = 20;

module.exports = Asteroid;