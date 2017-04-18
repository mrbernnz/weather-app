const request = require('request')
const { geocode } = require('./geocode')
const { weather } = require('./weather')

const requestedZip = 11203
geocode(requestedZip, (errorMessage, coordinates) => {
  if (errorMessage) {
    throw errorMessage
  } else {
    weather(coordinates, (error, { temperature, apparentTemperature }) => {
      console.log(temperature)
      console.log(apparentTemperature)
    })
  }
})
