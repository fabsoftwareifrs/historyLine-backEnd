"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("data", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hint:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      room_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "rooms",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("datas");
  },
};
