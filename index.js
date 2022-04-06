const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/orchestrator', (req,res) => {
    res.json('welcome!')
})

app.get('/orchestrator/weather', (req,res) => {
    const lat = req.query.lat
    const lon = req.query.lon

    const options = {
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
          lat: lat,
          lon: lon,
          appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
        },
    }

    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.error(error)
    })
})

app.get('/orchestrator/api-key/google-places', (req,res) => {
    res.json(process.env.REACT_APP_GOOGLE_MAPS_PLACES_API_KEY)
})


app.listen(8000, () => console.log(`Server is running on port ${PORT}`))