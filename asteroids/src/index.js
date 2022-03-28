console.log("Webpack is working!");

const MovingObject = require("./moving_object.js");
const Asteroid = require("./asteroid.js");

const mo = new MovingObject({
  pos: [30, 30],
  vel: [10, 10],
  radius: 20,
  color: "red"
});

const a = new Asteroid({ pos: [30, 30] });

window.MovingObject = mo;
window.Asteroid = a;

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("game-canvas");
  var ctx = canvasEl.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0,0, 1000, 650);
  mo.draw(ctx);
});