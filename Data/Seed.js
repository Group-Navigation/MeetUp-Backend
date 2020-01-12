// const Groups = require("../Database/Models/Groups");
// const Users = require("../Database/Models/Users");
// const Invitations = require('../Database/Models/Invitations');
// const Messages = require('../Database/Models/Messages');

const {Groups,Users,Invitations,Messages} = require("../Database");

const groups = require('./groups');
const users = require('./users');
const invitations = require('./invitations');
const messages = require('./messages');

const builtUsersArr = [];
const builtGroupArr = [];
const builtMessageArr = [];
const builtInvitationArr = [];

function getRandomInt(x) {
  return Math.floor((Math.random() * x) + 1);
}

const populateUsersTable = async (users) => {
  for (let i = 0; i < users.length; i++) {
    let current = users[i];
    let builtUser = await Users.create(current);
    builtUsersArr.push(builtUser);
  }
}

const populateGroupsTable = async (groups) => {
  for (let i = 0; i < groups.length; i++) {
    let current = groups[i];
    let builtGroup = await Groups.create(current);
    builtGroupArr.push(builtGroup);
  }
}

const populateMessagesTable = async(messages) =>{
  for(let i = 0; i< messages.length; i++)
  {
    let current = messages[i];
    let builtMessage = Messages.create(current);
    builtMessageArr.push(builtMessage);
  }
}

const populateInvitationsTable = async(invitations) =>{
  for(let i = 0; i< invitations.length; i++)
  {
    let current = invitations[i];
    let builtInvitation = Invitations.create(current);
    builtInvitationArr.push(builtInvitation);
  }
}

const associateUsersTable = async () => {
  for (let i = 0; i < builtUsersArr.length; i++) {
    let current = builtUsersArr[i];
    await current.addGroups(getRandomInt(2));
  }
}

const associateGroupsTable = async () => {
  for (let i = 0; i < builtGroupArr.length; i++) {
    let current = builtGroupArr[i];
    await current.addUsers(getRandomInt(5));

  }
}

const associateInvitationsTable = async() => {
  for(let i = 0; i < builtUsersArr.length; i++)
  {
    let current = builtUsersArr[i];
    await current.addInvitations(i+1);
  }
}

const associateMessagesTable = async() => {
  for(let i = 0; i< builtGroupArr.length; i++)
  {
    let current = builtGroupArr[i];
    await current.addMessages(i+1);
  }
}

const seedDatabase = async () => {
  try {
    await populateUsersTable(users);
    // await populateGroupsTable(groups);
    // await populateInvitationsTable(invitations);
    // await populateMessagesTable(messages);
    // await associateUsersTable();
    // await associateGroupsTable();
    // await associateInvitationsTable();
    // await associateMessagesTable();

    console.log('database has been re-seeded');
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = seedDatabase;