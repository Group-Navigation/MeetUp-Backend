
const db = require("./db");

const Groups = require("./Models/Groups");
const Users = require("./Models/Users");
const Invitations = require("./Models/Invitations");
const Messages = require("./Models/Messages");

Groups.belongsToMany(Users, {through: 'GroupUsers'});
Users.belongsToMany(Groups, {through: 'GroupUsers'});

Invitations.belongsTo(Users);
Users.hasMany(Invitations);

Messages.belongsTo(Groups);
Groups.hasMany(Messages);

module.exports = {db,Groups,Users,Invitations,Messages};
