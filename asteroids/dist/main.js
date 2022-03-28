/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\nfunction Asteroid(options) {\n  MovingObject.call(this, {\n    pos: options[\"pos\"],\n    vel: Util.randomVec(5),\n    radius: Asteroid.RADIUS,\n    color: Asteroid.COLOR,\n    game: options[\"game\"]\n  });\n}\n\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.COLOR = \"red\";\nAsteroid.RADIUS = 25;\n\nAsteroid.prototype.collideWith = function(otherObject) {\n  if(otherObject instanceof Ship) {\n    otherObject.relocate();\n  }\n};\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack://asteroids/./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\nfunction Game() {\n  this.asteroids = [];\n  this.ship = new Ship({pos: this.randomPosition(), game:this});\n  this.addAsteroids();\n}\n\nGame.DIM_X = 1000;\nGame.DIM_Y = 650;\nGame.NUM_ASTEROIDS = 10;\n\nGame.prototype.addAsteroids = function() {\n  for(let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n    this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));\n  }\n};\n\nGame.prototype.allObjects = function() {\n  return this.asteroids.concat([this.ship]);\n};\n\n//returns random position\nGame.prototype.randomPosition = function() {\n  let x = Math.random() * Game.DIM_X;\n  let y = Math.random() * Game.DIM_Y;\n  return [x,y];\n};\n\nGame.prototype.draw = function(ctx) {\n  ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);\n  ctx.fillStyle = \"black\";\n  ctx.fillRect(0, 0, 1000, 650);\n  let allObjs = this.allObjects();\n  for (let i = 0; i < allObjs.length; i++) {\n    allObjs[i].draw(ctx);\n  }\n};\n\nGame.prototype.moveObjects = function () {\n  let allObjs = this.allObjects();\n  for (let i = 0; i < allObjs.length; i++) {\n    allObjs[i].move();\n  }\n};\n\nGame.prototype.wrap = function(pos) {\n  let wrapped_pos = [pos[0], pos[1]];\n  if(pos[0] <= 0) {\n    wrapped_pos[0] = Game.DIM_X;\n  } else if(pos[0] >= Game.DIM_X) {\n    wrapped_pos[0] = 0;\n  }\n\n  if (pos[1] <= 0) {\n    wrapped_pos[1] = Game.DIM_Y;\n  } else if (pos[1] >= Game.DIM_Y) {\n    wrapped_pos[1] = 0;\n  }\n  return wrapped_pos;\n};\n\n//Using brute force approach, might need to refactor if num of asteroids gets big\nGame.prototype.checkCollisions = function() {\n  let allObjs = this.allObjects();\n  let n = allObjs.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = 0; j < n; j++) {\n      if(i !== j && i < n-1 && j < n) {\n        if(allObjs[i].isCollidedWith(allObjs[j])) {\n          allObjs[i].collideWith(allObjs[j]);\n          return;\n          // allObjs = this.allObjects();\n          // n = allObjs.length;\n          // i = 0;\n          // j = 0;\n        }\n      }\n    }\n  }\n};\n\nGame.prototype.step = function() {\n  this.moveObjects();\n  this.checkCollisions();\n};\n\nGame.prototype.remove = function(asteroid) {\n  this.asteroids = this.asteroids.filter((el) => el !== asteroid);\n};\n\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://asteroids/./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module) => {

eval("function GameView(game, ctx) {\n  this.game = game;\n  this.ctx = ctx;\n}\n\nGameView.prototype.start = function() {\n  setInterval(() => {\n    this.game.step();\n    this.game.draw(this.ctx);\n    this.bindKeyHandlers();\n  }, 20);\n};\n\nGameView.prototype.bindKeyHandlers = function() {\n  let moveRight = function() {\n    this.ship.power([4,0]);\n  }.bind(this.game);\n  key(\"right\", moveRight);\n\n  let moveLeft = function () {\n    this.ship.power([-4, 0]);\n  }.bind(this.game);\n  key(\"left\", moveLeft);\n\n  let moveDown = function () {\n    this.ship.power([0, 4]);\n  }.bind(this.game);\n  key(\"down\", moveDown);\n\n  let moveUp = function () {\n    this.ship.power([0, -4]);\n  }.bind(this.game);\n  key(\"up\", moveUp);\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack://asteroids/./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\nconst g = new Game();\n\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n  const canvasEl = document.getElementById(\"game-canvas\");\n  var ctx = canvasEl.getContext(\"2d\");\n  const view = new GameView(g, ctx);\n  view.start();\n});\n\n//# sourceURL=webpack://asteroids/./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction MovingObject(options) {\n  this.pos = options[\"pos\"];\n  this.vel = options[\"vel\"];\n  this.radius = options[\"radius\"];\n  this.color = options[\"color\"];\n  this.game = options[\"game\"];\n}\n\nMovingObject.prototype.draw = function(ctx) {\n  ctx.beginPath();\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n  ctx.stroke();\n  ctx.fillStyle = this.color;\n  ctx.fill();\n};\n\nMovingObject.prototype.move = function() {\n  this.pos = this.game.wrap(this.pos);\n  this.pos[0] += this.vel[0];\n  this.pos[1] += this.vel[1];\n};\n\nMovingObject.prototype.isCollidedWith = function(otherObject) {\n  if(Util.distance(this.pos, otherObject.pos) < (this.radius + otherObject.radius)){\n    return true;\n  } else {\n    return false;\n  }\n};\n\nMovingObject.prototype.collideWith = function(otherObject) {\n  // this.game.remove(otherObject);\n  // this.game.remove(this);\n};\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack://asteroids/./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\nfunction Ship(options) {\n  MovingObject.call(this, {\n    pos: options[\"pos\"],\n    vel: [0,0],\n    radius: Ship.RADIUS,\n    color: Ship.COLOR,\n    game: options[\"game\"]\n  });\n}\n\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.relocate = function () {\n  this.pos = this.game.randomPosition();\n  this.vel = [0, 0];\n};\n\nShip.prototype.power = function(impulse) {\n  this.vel[0] = impulse[0];\n  this.vel[1] = impulse[1];\n  \n  // if(this.vel[0] < -4) {\n  //   this.vel[0] = -4;\n  // } else if(this.vel[0] > 4) {\n  //   this.vel[0] = 4;\n  // }\n\n  // if (this.vel[1] < -4) {\n  //   this.vel[1] = -4;\n  // } else if (this.vel[1] > 4) {\n  //   this.vel[1] = 4;\n  // }\n};\n\nShip.RADIUS = 20;\nShip.COLOR = \"blue\";\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack://asteroids/./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("const Util = {\n  inherits(childClass, parentClass) {\n    function Surrogate() {}\n    Surrogate.prototype = parentClass.prototype;\n    childClass.prototype = new Surrogate();\n    childClass.prototype.constructor = childClass;\n  },\n\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n\n  // Scale the length of a vector by the given amount.\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n\n  distance(pos1, pos2) {\n    return Math.sqrt(Math.pow((pos1[0] - pos2[0]), 2) + Math.pow((pos1[1] - pos2[1]), 2));\n  },\n\n  norm(pos) {\n    this.distance([0,0], pos);\n  }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack://asteroids/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;