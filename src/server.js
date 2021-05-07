const path = require('path') // core node modules are to be loaded before the 3rd party modules 
const express = require('express')
const hbs = require('hbs')

const serverExports = require('./serverExports.js')

const app = express()
const htmlFilePath = path.join(__dirname, '../public/')
app.use(express.static(htmlFilePath))
app.set('view engine', 'hbs')

// customizing the views directory, hbs by defauls looks for hte 'views in root
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// 1: Default Request 
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        header: 'Welcome to the Home Page!',
        subHeader: 'Contents',
        text: 'This is how we can load content dynamically in this card. You can too if you want.',
        author: 'Albert Einstein'
    })
})

app.get('/home', (req, res) => {
    res.render('home', {
        title: 'Home',
        header: 'Welcome to the Home Page!',
        subHeader: 'Contents',
        text: 'This is how we can load content dynamically in this card. You can too if you want.',
        author: 'Albert Einstein'
    })
})

// 2: /help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        header: 'Welcome to the Help Page!',
        subHeader: 'Self Help Contents',
        text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
        author: 'Albert Einstein'
    })
})

// 3: /about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        header: 'Welcome to the About Us!',
        subHeader: 'Meet Our Team',
        text: " We are all very different. We were born in different cities, at different times, we love different music, food, movies. But we have something that unites us all. It is our company. We are its heart. We are not just a team, we are a family.",
        author: 'Kaushal Behere'
    })
})

// 4: /weather
app.get('/weather/', (req, res) => {
    // console.log()
    var locationAddress = (req.query.address == '' || req.query.address == null || req.query.address == undefined) ? 'Baker Street, United Kingdom' : req.query.address
    serverExports.getWeatherReport(locationAddress, (weatherData) => {
        console.log(weatherData)
        // res.send(weatherData)
        res.render('weather', {
            title: 'Weather',
            latitude: weatherData.locationData.latitude,
            longitude: weatherData.locationData.longitude,
            placeName: weatherData.locationData.placeName,
            observationTime: weatherData.weatherData.observationTime,
            temperature: weatherData.weatherData.temperature,
            weatherDescriptions: weatherData.weatherData.weatherDescriptions,
            windSpeed: weatherData.weatherData.windSpeed,
            windDegree: weatherData.weatherData.windDegree,
            windDir: weatherData.weatherData.windDir,
            pressure: weatherData.weatherData.pressure,
            precipitation: weatherData.weatherData.precipitation,
            humidity: weatherData.weatherData.humidity,
            cloudCover: weatherData.weatherData.cloudCover,
            feelsLike: weatherData.weatherData.feelsLike,
            uvIndex: weatherData.weatherData.uvIndex,
            visibility: weatherData.weatherData.visibility,
            isDay: weatherData.weatherData.isDay
        })
    })
})

// 4: /weatherData
app.get('/WeatherData/', (req, res) => {
    // console.log()
    var locationAddress = (req.query.address == '' || req.query.address == null || req.query.address == undefined) ? 'Baker Street, United Kingdom' : req.query.address
    serverExports.getWeatherReport(locationAddress, (weatherData) => {
        console.log(weatherData)
        res.send({
            forecast: 'It is snowing',
            location: 'Philadelphia'
            })
        // res.send({
        //     forecast: weatherData,
        //     location: locationAddress
        // })
        // res.send(weatherData)
        // res.send('weather', {
        //     title: 'Weather',
        //     latitude: weatherData.locationData.latitude,
        //     longitude: weatherData.locationData.longitude,
        //     placeName: weatherData.locationData.placeName,
        //     observationTime: weatherData.weatherData.observationTime,
        //     temperature: weatherData.weatherData.temperature,
        //     weatherDescriptions: weatherData.weatherData.weatherDescriptions,
        //     windSpeed: weatherData.weatherData.windSpeed,
        //     windDegree: weatherData.weatherData.windDegree,
        //     windDir: weatherData.weatherData.windDir,
        //     pressure: weatherData.weatherData.pressure,
        //     precipitation: weatherData.weatherData.precipitation,
        //     humidity: weatherData.weatherData.humidity,
        //     cloudCover: weatherData.weatherData.cloudCover,
        //     feelsLike: weatherData.weatherData.feelsLike,
        //     uvIndex: weatherData.weatherData.uvIndex,
        //     visibility: weatherData.weatherData.visibility,
        //     isDay: weatherData.weatherData.isDay
        // })
    })
})

// *--> wildcard, this matches to any other page which are not specified above
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        header: 'Oops!',
        subHeader: '404 Page Not Found!',
        text: "Sorry, an error has occurred, Requested page not found.",
        author: 'Kaushal Behere'
    })
})

//For deploying the application in heroku we need to have this port value to be defined at runtime
const port = process.env.PORT || 3000

// Starting the web server to listen to the server on port 3000
app.listen(port, () => { console.log('Server Application is up and running on port : 3000 !!!') })