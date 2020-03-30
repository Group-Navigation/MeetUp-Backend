const Sequelize = require("sequelize");
const db = require("../db");

  const Groups = db.define("Groups", {
      name: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      long: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      lat: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      archive:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
  });

module.exports = Groups;