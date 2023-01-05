const Room = require("../../models/Room");

module.exports = {
  async deleteRoom(id) {
    try {
      const deleteRoom = await Room.destroy({ where: { id } });
      if (!deleteRoom) throw new Error("Sala não encontrada");
      return deleteRoom;
    } catch (error) {
      throw new Error(error);
    }
  },
};
