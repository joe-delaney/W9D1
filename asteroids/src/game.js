const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");

function Game() {
  this.asteroids = [];
  this.ship = new Ship({pos: this.randomPosition(), game:this});
  this.addAsteroids();
}

Game.DIM_X = 1000;
Game.DIM_Y = 650;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {
  for(let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));
  }
};

Game.prototype.allObjects = function() {
  return this.asteroids.concat([this.ship]);
};

//returns random position
Game.prototype.randomPosition = function() {
  let x = Math.random() * Game.DIM_X;
  let y = Math.random() * Game.DIM_Y;
  return [x,y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1000, 650);
  let allObjs = this.allObjects();
  for (let i = 0; i < allObjs.length; i++) {
    allObjs[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function () {
  let allObjs = this.allObjects();
  for (let i = 0; i < allObjs.length; i++) {
    allObjs[i].move();
  }
};

Game.prototype.wrap = function(pos) {
  let wrapped_pos = [pos[0], pos[1]];
  if(pos[0] <= 0) {
    wrapped_pos[0] = Game.DIM_X;
  } else if(pos[0] >= Game.DIM_X) {
    wrapped_pos[0] = 0;
  }

  if (pos[1] <= 0) {
    wrapped_pos[1] = Game.DIM_Y;
  } else if (pos[1] >= Game.DIM_Y) {
    wrapped_pos[1] = 0;
  }
  return wrapped_pos;
};

//Using brute force approach, might need to refactor if num of asteroids gets big
Game.prototype.checkCollisions = function() {
  let allObjs = this.allObjects();
  let n = allObjs.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if(i !== j && i < n-1 && j < n) {
        if(allObjs[i].isCollidedWith(allObjs[j])) {
          allObjs[i].collideWith(allObjs[j]);
          return;
          // allObjs = this.allObjects();
          // n = allObjs.length;
          // i = 0;
          // j = 0;
        }
      }
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(asteroid) {
  this.asteroids = this.asteroids.filter((el) => el !== asteroid);
};


module.exports = Game;