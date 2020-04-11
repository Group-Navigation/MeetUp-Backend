const database = require("./db");

const Group = require("./Models/Groups");
const User = require("./Models/Users");
const Invitation = require("./Models/Invitations");
const Message = require("./Models/Messages");

Group.belongsToMany(User, {through: 'GroupUser'});
User.belongsToMany(Group, {through: 'GroupUser'});

Invitation.belongsToMany(User, {through: 'InvitationUser'});
User.belongsToMany(Invitation, {through: 'InvitationUser'});

Message.belongsTo(Group);
Group.hasMany(Message);

database.authenticate().then(() => {
    console.log("Connected to Postgres Database");
})
.catch(err => {
    console.log("Error Connecting to Postgres Database");
    console.error(err);
});

module.exports.database = database;
module.exports.models = {Group,User,Invitation,Message};