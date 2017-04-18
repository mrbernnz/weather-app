const request = require('request')

const geocode = (zip,callback) => {
  const options = {
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${zip}`,
    json: true
  }
  request(options, (error, response, body) => {
    if (error) {
      callback(error)
    } else if (body.status === 'ZERO_RESULTS') {
      callback('NOT A VALID ZIP CODE')
    } else {
      callback(undefined, {
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    }
  })
}

module.exports.geocode = geocode
