const Sequelize = require("sequelize");
const db = require("../db");

const Users = db.define("Users", {
    displayName: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    profilePic: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
    },
    long: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    lat: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    contacts:{
      type: Sequelize.ARRAY(Sequelize.INTEGER),//Primary keys of users
      allowNull: true //
    }
  });

module.exports= Users;