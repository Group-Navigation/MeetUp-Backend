const {Group,User,Invitation,Message} = require("..").models;

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

const populateUserTable = async (users) => {
  for (let i = 0; i < users.length; i++) {
    let current = users[i];
    let builtUser = await User.create(current);
    builtUsersArr.push(builtUser);
  }
}

const populateGroupTable = async (groups) => {
  for (let i = 0; i < groups.length; i++) {
    let current = groups[i];
    let builtGroup = await Group.create(current);
    builtGroupArr.push(builtGroup);
  }
}

const populateMessageTable = async(messages) =>{
  for(let i = 0; i< messages.length; i++)
  {
    let current = messages[i];
    let builtMessage = await Message.create(current);
    builtMessageArr.push(builtMessage);
  }
}

const populateInvitationTable = async(invitations) =>{
  for(let i = 0; i< invitations.length; i++)
  {
    let current = invitations[i];
    let builtInvitation = await Invitation.create(current);
    builtInvitationArr.push(builtInvitation);
  }
}

const associateUserTable = async () => {
  for (let i = 0; i < builtUsersArr.length; i++) {
    let current = builtUsersArr[i];
    await current.addGroups(getRandomInt(2)); //set primary key
  }
}

const associateGroupTable = async () => {
  for (let i = 0; i < builtGroupArr.length; i++) {
    let current = builtGroupArr[i];
    await current.addUsers(getRandomInt(5));

  }
}

const associateInvitationTable = async() => {
  for(let i = 0; i < builtUsersArr.length; i++)
  {
    let current = builtUsersArr[i];
    await current.addInvitations(i+1);
  }
}

const associateMessageTable = async() => {
  for(let i = 0; i< builtGroupArr.length; i++)
  {
    let current = builtGroupArr[i];
    await current.addMessages(i+1);
  }
}

const seedDatabase = async () => {
  try {
    await populateUserTable(users);
    await populateGroupTable(groups);
    await populateInvitationTable(invitations);
    await populateMessageTable(messages);
    
    await associateUserTable();
    await associateGroupTable();
    await associateInvitationTable();
    await associateMessageTable();

    console.log('database has been re-seeded');
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = seedDatabase;