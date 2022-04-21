const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express();
const path = require('path');

app.use(cors())

app.get('/orchestrator', (req,res) => {
    res.json('welcome!')
})

const openWeatherMapKeys = process.env.REACT_APP_OPEN_WEATHER_API_KEYS.split(",");
let openWeatherMapIterator = 0;
app.get('/orchestrator/weather', (req,res) => {
    if(openWeatherMapIterator >= openWeatherMapKeys.length)
        openWeatherMapIterator = 0;
    const key = openWeatherMapKeys[openWeatherMapIterator++];

    const lat = req.query.lat
    const lon = req.query.lon

    const options = {
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
          lat: lat,
          lon: lon,
          units: 'metric',
          appid: key,
        },
    }

    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.error(error.message+" using key "+key);
    })
})

app.get('/orchestrator/api-key/google-places', (req,res) => {
    res.json(process.env.REACT_APP_GOOGLE_MAPS_PLACES_API_KEY)
})

app.get('/orchestrator/privacy/weather-we-go', (req,res) => {
    res.sendFile(path.join(__dirname+'/weather-we-go-privacy.html'));
})

app.listen(8000, () => console.log(`Server is running on port ${PORT}`))
