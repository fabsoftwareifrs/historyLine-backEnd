const UserController = require("./UserController.js");
const RoomController = require("./RoomController.js");
const AuthController = require("./AuthController");
const gameController = require("./GameSatartedController");
const AttemptGame = require("./attemptGameController");

module.exports = {
  UserController,
  RoomController,
  AuthController,
  gameController,
  AttemptGame,
};
