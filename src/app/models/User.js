"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Room, { foreignKey: "userId" });
      User.hasMany(models.UsersRooms, {foreignKey: "userId"});
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      passwordHash: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  ),
    {
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
    };

  return User;
};
