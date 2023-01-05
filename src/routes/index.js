const express = require("express");
const { checkToken } = require("../app/middlewares/Auth.js");
const {
  UserController,
  RoomController,
  AuthController,
  gameController,
  AttemptGame,
} = require("../app/controllers/");

const routes = express.Router();

routes
  .get("/", (req, res) => res.json({ message: "Welcome to API historyLine" }))
  // Room Routes
  .get("/room", checkToken, RoomController.getAllRoom)
  .post("/room", checkToken, RoomController.create)
  .delete("/room/:id", checkToken, RoomController.delete)
  // Game Start
  .get("/game/:room_id", checkToken, gameController.started)
  // User Routes
  .post("/user", UserController.store)
  .post("/user", checkToken, UserController.update)
  .post("/user/auth", AuthController.auth)
  // Return game object
  .post("/answer", checkToken, AttemptGame.playerTry)
  .get("/listRoom", RoomController.listAll);

module.exports = routes;
