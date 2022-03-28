function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  this.bindKeyHandlers();
  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function() {
  let moveRight = function() {
    this.ship.power([4,0]);
  }.bind(this.game);
  key("right", moveRight);

  let moveLeft = function () {
    this.ship.power([-4, 0]);
  }.bind(this.game);
  key("left", moveLeft);

  let moveDown = function () {
    this.ship.power([0, 4]);
  }.bind(this.game);
  key("down", moveDown);

  let moveUp = function () {
    this.ship.power([0, -4]);
  }.bind(this.game);
  key("up", moveUp);

  let fire = function () {
    this.ship.fireBullet();
  }.bind(this.game);
  key("space", fire);
};

module.exports = GameView;