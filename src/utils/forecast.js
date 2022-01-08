const request = require('request')
require('dotenv').config()
const key = process.env.WEATHER_API_KEY

function forecast(address, callback) {
   const url = 'https://api.weatherapi.com/v1/current.json?key=' + key + '&q=' + address + ' '

   request({ url, json: true }, (error, { body }) => {
      if (error) {
         callback('Unable to connect weather services')
      } else if (body.error) {
         callback('Unable To Find Location')
      } else {
         const {
            current: {
               temp_c,
               wind_kph,
               wind_dir,
               humidity,
               condition: { text },
            },
            location: { localtime },
         } = body
         callback(undefined, {
            temperature: temp_c + '-C',
            wind_speed: wind_kph + '-Kmph',
            wind_direction: wind_dir,
            humidity: humidity,
            local_time: localtime,
            climate: text,
         })
      }
   })
}
module.exports = forecast
