const { getAll } = require("./get-all-room-service");
const { createRoom } = require("./create-room-service");
const { deleteRoom } = require("./delete-room-service");
// const {  } = require("./AlterRoomService");

module.exports = {
  getAll,
  createRoom,
  deleteRoom,
};
