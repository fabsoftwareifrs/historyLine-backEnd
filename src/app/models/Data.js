const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Data extends Model {
    static associate(models) {
      Data.belongsTo(models.Room, { foreignKey: "roomId" });
    }
  }

  Data.init(
    {
      data: DataTypes.STRING,
      room_id: DataTypes.INTEGER,
      hint: DataTypes.STRING,
      year: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Data",
    }
  );
  return Data;
};
