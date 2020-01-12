const express = require('express');
const router = express.Router();
const geoLocation = require('../Api/geocode');
const axios = require('axios');
const {getUserRoute, getUserETA} = require('../Api');

router.post('/', async (req,res) =>{ //returns the route to destionation for all user
    let userPaths = [];
    //console.log(req.body.newGroup.users.length);
    for (let i = 0; i < req.body.newGroup.users.length; i++){
        let request = {
            user: req.body.newGroup.users[i],
            latitude: req.body.newGroup.latitude,
            longitude: req.body.newGroup.longitude
        }
        //console.log(request);
        let da = await getUserRoute(request)
        //console.log(i);
        userPaths.push(da);
    }
    //console.log("done");
    res.status(200).send(userPaths);                 //must contain a response body so api works
})

router.post('/eta', async (req,res,next) =>{ //returns the route to destionation for one user
    let userPaths = [];
    //console.log(req.body);
    for (let i = 0; i < req.body.workingGroup.users.length; i++){
        let request = {
            user: req.body.workingGroup.users[i],
            latitude: req.body.workingGroup.latitude,
            longitude: req.body.workingGroup.longitude
        }
        userPaths.push(await getUserETA(request));
    }
    res.status(200).send(userPaths);                 
})

router.post('/address', async (req,res) =>{ //returns the coordinates for an input address
    let addressDecoded = await geoLocation(req.body.address);
    res.status(200).send(addressDecoded);          
})

module.exports = router;