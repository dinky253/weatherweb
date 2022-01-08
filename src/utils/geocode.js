const request = require('request')
require('dotenv').config()
const key = process.env.MAPBOX_API_KEY

function geocode(address, callback) {
   const geocodeURL =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?&access_token=' + key

   request({ url: geocodeURL, json: true }, (error, response) => {
      const { features } = response.body
      if (error) {
         callback('Unable to connect Location services')
      } else if (features.length === 0) {
         callback('Unable To Find Location')
      } else {
         callback(undefined, {
            latitude: features[0].center[1],
            longitude: features[0].center[0],
            location: features[0].place_name,
         })
      }
   })
}
module.exports = geocode
