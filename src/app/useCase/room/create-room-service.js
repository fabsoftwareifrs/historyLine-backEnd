const { Room, Data } = require("../../models/index.js");
module.exports = {
  async createRoom(roomData, dataHistory) {
    try {
      const newRoom = await Room.create(
        { ...roomData, Data: dataHistory },
        { include: { model: Data } }
      );
      return { newRoom, Data };
    } catch (error) {
      throw new Error(error);
    }
  },
};
