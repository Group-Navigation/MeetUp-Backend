const Sequelize = require("sequelize");
const db = require("../db");

const Invitations = db.define('Invitations', {
    sender: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    group:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Invitations;