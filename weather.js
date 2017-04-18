const request = require('request')

const weather = (coordinates, callback) => {
  options = {
    url: `https://api.darksky.net/forecast/${process.env.DARK_SKY}/${coordinates.latitude},${coordinates.longitude}`,
    json: true
  }
  request(options, (error, response, body) => {
    if (!error) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    } else {
      callback(error)
    }
  })
}

module.exports.weather = weather
