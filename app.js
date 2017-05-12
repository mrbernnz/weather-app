const app = require('express')()
const axios = require('axios')
const encodedAddress = encodeURIComponent(11203)
const url = process.env.GOOGLE_MAPS_API + encodedAddress


app
  .set('port', 4000 || process.env.PORT)
  .get('/', (req, res) => {
    axios
      .get(url)
      .then(({ data }) => {
        if (data.status === 'ZERO_RESULTS') {
          throw new Error('CANNOT TO FIND ADDRESS')
        }

        let lat = data.results[0].geometry.location.lat
        let lng = data.results[0].geometry.location.lng
        const weatherURL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API}/${lat},${lng}`
        return axios.get(weatherURL)
      })
      .then(({ data }) => {
        res.send(`<h1>${data.currently.temperature}</h1>`)
      })
      .catch(e => {
        if (e.code === 'ENOTFOUND') {
          console.log('Unable to connect to API server.')
          // throw new Error('Unable to connect to API server.')
        } else if (e.code === 'ECONNREFUSED') {
          console.log('Connection is refused.')
          // throw new Error('Connection is refused.')
        } else {
          console.log(e.message)
          // throw new Error(e.message)
        }
      })
  })

  .listen(app.get('port'))
