const { RESTDataSource } = require('apollo-datasource-rest');

class GoogleAPI extends RESTDataSource{
    constructor(){
        super();
        this.client = require('@google/maps').createClient({
            key: 'AIzaSyDoRlTwsYiTo7jhQsFb0UWYOTqXrdHnPHM',
            Promise: Promise
        });
        this.polyline = require('polyline');
    }

    async getLocationByAddress(address){
        let request = {
            address : address
        }
        //console.log(request);
        let response = await this.client.geocode(request).asPromise().catch(err => console.log(err));
        let geoLocation = response.json.results;
        if (geoLocation.length > 0){
            let resultLocation = geoLocation[0].geometry.location;
            return resultLocation;
        }
    }

    async getRouteAndETA(data){ // object full of user and destination properties only
        let path = [];
        let eta = "";

        const {user, group} = data;
        let request = {
            origin: user,
            destination: group,
            mode: 'transit',
            transit_mode: 'subway' //check docs for other potentially useful optional parameters
        }

        let response = await this.client.directions(request).asPromise();
        let routes = response.json.routes;
        if (routes.length > 0){
            let pathLine = routes[0].overview_polyline.points;
            //console.log(pathLine);
            //path is an array of arrays of coordinates
            //after path is computed, send it to the map component on the front-end and create a PathLayer based on these coordinates
            //(note that path returns coordinates in order [latitude, longitude], while PathLayer accepts coordinates in order [longitude, latitude])
            path = this.polyline.decode(pathLine);

            eta = routes[0].legs[0].duration.text;
            //path is an array of arrays of coordinates
            //after path is computed, send it to the map component on the front-end and create a PathLayer based on these coordinates
            //(note that path returns coordinates in order [latitude, longitude], while PathLayer accepts coordinates in order [longitude, latitude])
        }

        return {path,eta};
    }
    
}

module.exports = GoogleAPI;