const Sequelize = require("sequelize");
const db = require("../db");

const Messages = db.define("Messages", {
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    sender: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    timestamp: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
})

module.exports = Messages;