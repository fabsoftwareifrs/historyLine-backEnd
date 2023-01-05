const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UsersRooms extends Model {
    static associate(models) {
      UsersRooms.belongsTo(models.Room, { foreignKey: "roomId" });
      UsersRooms.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  UsersRooms.init(
    {
      pointsRoom: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UsersRooms",
    }
  );
  return UsersRooms;
};
