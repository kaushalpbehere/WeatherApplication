const path = require('path')
const express = require('express')
const hbs = require('hbs')

const serverExports = require('./serverExports.js')

const app = express()
const htmlFilePath = path.join(__dirname, '../public/')
app.use(express.static(htmlFilePath))
app.set('view engine', 'hbs')

app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('/', (req, res) => {
    res.render('weather', {
        title: 'Weather',
        header: 'Weather Forecast',
        subHeader: 'Get real-time weather updates'
    })
})

app.get('/weather/', async (req, res) => {
    try {
        const { address, lat, lon } = req.query;
        const weatherData = await serverExports.getWeatherReport(address, lat, lon);
        res.render('weather', {
            title: 'Weather',
            ...weatherData.locationData,
            ...weatherData.weatherData
        });
    } catch (error) {
        res.status(500).render('error', {
            title: 'Error',
            header: 'Error',
            subHeader: 'Weather Data Error',
            text: "Unable to fetch weather data. Please try again.",
            author: 'System'
        });
    }
});

app.get('/weatherData/', async (req, res) => {
    try {
        const { address, lat, lon } = req.query;
        const weatherData = await serverExports.getWeatherReport(address, lat, lon);
        res.json({
            title: 'Weather',
            ...weatherData.locationData,
            ...weatherData.weatherData
        });
    } catch (error) {
        res.status(500).json({
            error: 'Unable to fetch weather data'
        });
    }
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        header: 'Oops!',
        subHeader: '404 Page Not Found!',
        text: "Sorry, an error has occurred, Requested page not found.",
        author: 'System'
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => { 
    console.log(`Server Application is up and running on port: ${port} !!!`) 
})