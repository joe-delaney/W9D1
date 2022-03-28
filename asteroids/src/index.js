const Game = require("./game.js");
const GameView = require("./game_view.js");

const g = new Game();


document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("game-canvas");
  var ctx = canvasEl.getContext("2d");
  const view = new GameView(g, ctx);
  // g.draw(ctx);
  view.start();
});