const Asteroid = require("./asteroid.js");

function Game() {
  this.asteroids = [];
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
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids[i].move();
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
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    for (let j = 0; j < Game.NUM_ASTEROIDS; j++) {
      if(i !== j) {
        if(this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          this.asteroids[i].collideWith(this.asteroids[j]);
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
  debugger;
  let index = this.asteroids.indexOf(asteroid);
  if(index !== -1) {
    this.asteroids.splice(index, 1);
  }
};

module.exports = Game;