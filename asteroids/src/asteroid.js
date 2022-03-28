const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");

function Asteroid(options) {
  MovingObject.call(this, {
    pos: options["pos"],
    vel: Util.randomVec(5),
    radius: Asteroid.RADIUS,
    color: Asteroid.COLOR,
    game: options["game"]
  });
}

Util.inherits(Asteroid, MovingObject);

Asteroid.COLOR = "red";
Asteroid.RADIUS = 25;

module.exports = Asteroid;