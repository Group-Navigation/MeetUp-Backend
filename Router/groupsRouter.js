const express = require("express");
const router = express.Router();
const {Groups} = require("../Database");
const {Users} = require("../Database");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

router.get('/:id', (req,res) => { //find group by primary key/id
  Groups.findByPk(req.params.id)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => console.log(err))
})

router.get("/", (req, res, next) => { // get all groups
  Groups.findAll({
    include: [{all:true}]
  })
  .then(result => {
    res.status(200).send(result);
  })
  .catch(next)
});

router.put("/", (req, res, next) => { // get a specific group with associated users
  let data = req.body
  Groups.findAll({
    where:{
      id: data.id
    }
    , include: [{
      model : Users
    }]
  })
  .then(result => {
    res.status(200).send(result[0].Users);
  })
  .catch(next)
});

router.post('/', (req, res) => { //Add new group to database with users assosiated to the new group
  Groups.findAll({
    where: {name : req.body.newGroup.name.trim()}
  })
    .then(async group => {
      if(isEmpty(group)){
        let {longitude, name, latitude} = req.body.newGroup;
        let builtGroup = await Groups.create({longitude,latitude,name});
        for(let i =0; i < req.body.newGroup.users.length; i++)
        {
          let user = null;
          try{
            user = await Users.findByPk(req.body.newGroup.users[i].id)
          }
          catch(err){console.log(err)}
          builtGroup.addUsers(user);
        }
        res.status(200).send(builtGroup.dataValues);
      }
      else
      {
        res.status(400).send();
      }  
    })
    .catch(err => console.log(err))
});

router.put('/add', async(req,res,next) =>{   //associate user to a group
  let group = await Groups.findByPk(req.body.groupId).catch(err => console.log(err))

  let user = await Users.findByPk(req.body.id).catch(err => console.log(err))

  await group.addUsers(user);

  let result = await Groups.findAll({
    where: {id : req.body.groupId},
    include: [{model: Users}]
  })
  res.status(200).send(result);
})

router.put('/remove', async(req,res,next) =>{   //removing user association from a group
  let user = null;
  await Users.findByPk(req.body.id)
  .then(res => {
    user = res;
  })
  .catch(err => console.log(err))

  await Groups.findByPk(req.body.groupId)
  .then(group =>{
      group.removeUsers(user);
      res.status(200).send(group);
  })
  .catch(err => console.log(err))
})

router.put('/users',async (req,res) =>{ //associate user to a group
  let group = await Groups.findByPk(req.body.groupId).catch(e => console.log(e))
  for(let i = 0; i < req.body.users.length; i++)
  {
    let user = await Users.findByPk(req.body.users[i].id).catch(e=>console.log(e))
    group.addUsers(user)
  }
  res.status(200).send();
})

router.delete('/:name', async (req, res, next) => {   //delete a group
  await Groups.findAll({ where: { name: req.params.name } })
    .then(async group => {
      if (!isEmpty(group)) {
        await Groups.destroy({ where: { name: req.params.name } })
        console.log('Group Destroyed');

        await Groups.findAll({ include: { model: Users } })
          .then(groups => {
            res.status(200).send(groups);
          })
          .catch(err => console.log(err))
      }
      else {
        res.status(404).send();
      }
    })
})

module.exports = router;
