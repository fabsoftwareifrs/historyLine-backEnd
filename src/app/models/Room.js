"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsTo(models.User, { foreignKey: "userId" });
      Room.hasMany(models.Data, { foreignKey: "roomId" });
      Room.hasMany(models.UsersRooms, {foreignKey: "roomId"})
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
      privater: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
