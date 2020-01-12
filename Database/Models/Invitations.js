const Sequelize = require("sequelize");
const db = require("../db");

const Invitations = db.define('Invitations', {
    sender: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    groupName:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Invitations;