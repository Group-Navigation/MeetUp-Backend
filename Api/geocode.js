const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDoRlTwsYiTo7jhQsFb0UWYOTqXrdHnPHM',
    Promise: Promise
});

async function getLocationByAddress(address){
    let request = {
        address : address
    }
    //console.log(request);
    let response = await googleMapsClient.geocode(request).asPromise().catch(err => console.log(err));
    let geoLocation = response.json.results;
    if (geoLocation.length > 0){
        let resultLocation = geoLocation[0].geometry.location;
        return resultLocation;
    }
}

module.exports = getLocationByAddress;