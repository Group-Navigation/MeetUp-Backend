const polyline = require('polyline');

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDoRlTwsYiTo7jhQsFb0UWYOTqXrdHnPHM',
    Promise: Promise
});

async function getUserRoute(formData){ // object full of user and destination properties only
    let userPath = [];
    const {user, latitude, longitude} = formData;
    let request = {
        origin: {
            latitude: user.lat,
            longitude: user.long
        },
        destination: {
            latitude: latitude,
            longitude: longitude
        },
        mode: 'transit',
        transit_mode: 'subway' //check docs for other potentially useful optional parameters
    }
    let response = await googleMapsClient.directions(request).asPromise();
        let routes = response.json.routes;
        if (routes.length > 0){
            let pathLine = routes[0].overview_polyline.points;
            //console.log(pathLine);
            //path is an array of arrays of coordinates
            //after path is computed, send it to the map component on the front-end and create a PathLayer based on these coordinates
            //(note that path returns coordinates in order [latitude, longitude], while PathLayer accepts coordinates in order [longitude, latitude])
            userPath = polyline.decode(pathLine);
        }
    
    
    return userPath;
}

async function getUserETA(formData){ // object full of user and destination properties only
    let userETA = [];
    const {user, latitude, longitude} = formData;
    let request = {
        origin: {
            latitude: user.lat,
            longitude: user.long
        },
        destination: {
            latitude: latitude,
            longitude: longitude
        },
        mode: 'transit',
        transit_mode: 'subway' //check docs for other potentially useful optional parameters
    }
    let response = await googleMapsClient.directions(request).asPromise();
        let routes = response.json.routes;
        //console.log(routes);
        if (routes.length > 0){
            let eta = routes[0].legs[0].duration.text;
            //path is an array of arrays of coordinates
            //after path is computed, send it to the map component on the front-end and create a PathLayer based on these coordinates
            //(note that path returns coordinates in order [latitude, longitude], while PathLayer accepts coordinates in order [longitude, latitude])
            userETA.push(eta);
        }
    
    
    return userETA;
}

module.exports = {getUserRoute, getUserETA};