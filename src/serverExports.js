const requests = require('requests')
const chalk = require('chalk')
const mapBoxUrl1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapBoxUrl2 = '.json?types=address&access_token=pk.eyJ1Ijoia2F1c2hhbHBiZWhlcmUiLCJhIjoiY2tuZWhza3pnMjY0czJ2dGFkb3FobGthcCJ9.PXoQLcnWXa8fyOWQ1i0PTg&limit=1'

const weatherUrl = 'http://api.weatherstack.com/current?access_key=1e31bf344ad559b01ec66921abc27305&query='

// 1 : Get Coordinates
const getLocationData = (address, callback) => {
    requests(mapBoxUrl1 + address + mapBoxUrl2)
        .on('data', (response) => {
            const locationDetails = {
                latitude: '',
                longitude: '',
                placeName: ''
            }
            try {
                const coordinatesData = JSON.parse(response)
                locationDetails.placeName = coordinatesData.features[0].place_name
                locationDetails.longitude = coordinatesData.features[0].center[0]
                locationDetails.latitude = coordinatesData.features[0].center[1]
            } catch (exception) {
                console.log(chalk.bgRed.white.bold('Exception encountered while retrieving coordinate data !!!'))
            }
            callback(locationDetails)
        })
        .on('end', (error) => {
            if (error)
                return console.log('No internet or some network issue, please check whether you are connected to internet.', error);
        });
}

// 2: Get weather details
const getWeatherDetails = ({ latitude, longitude }, callback) => { //Object Destructuring used  --> {latitude,longitude}
    requests(weatherUrl + latitude + ',' + longitude)
        .on('data', (response) => {
            // const currentData = {
            //     current
            // }
            const weatherDataDetails = {
                observationTime: '',
                temperature: '',
                weatherDescriptions: '',
                windSpeed: '',
                windDegree: '',
                windDir: '',
                pressure: '',
                precipitation: '',
                humidity: '',
                cloudCover: '',
                feelsLike: '',
                uvIndex: '',
                visibility: '',
                isDay: ''
            }
            try {
                const weatherData = JSON.parse(response)
                // const location  = weatherData.location
                const { location } = weatherData // After object Destructuring
                const current = weatherData.current
                weatherDataDetails.observationTime = 'Current weather (At time ' + current.observation_time.toString() + '):'
                weatherDataDetails.temperature = 'Temperature: ' + current.temperature
                weatherDataDetails.weatherDescriptions = 'Weather described as: ' + current.weather_descriptions[0]
                weatherDataDetails.windSpeed = 'Wind Speed: ' + current.wind_speed
                weatherDataDetails.windDegree = 'Wind Degree: ' + current.wind_degree
                weatherDataDetails.windDir = 'Wind Direction: ' + current.wind_dir
                weatherDataDetails.pressure = 'Pressure: ' + current.pressure
                weatherDataDetails.precipitation = 'Precipitation: ' + current.precip
                weatherDataDetails.humidity = 'Humidity: ' + current.humidity
                weatherDataDetails.cloudCover = 'Cloud Cover: ' + current.cloudcover
                weatherDataDetails.feelsLike = 'Feels Like: ' + current.feelslike
                weatherDataDetails.uvIndex = 'UV index: ' + current.uv_index
                weatherDataDetails.visibility = 'Visibility: ' + current.visibility
                weatherDataDetails.isDay = 'Is : ' + (current.is_day == "yes") ? "Day" : "Night" + ' time.'
                callback(weatherDataDetails)

            } catch (exception) {
                console.log(chalk.bgRed.white.bold('Exception encountered while retrieving weather data !!!'))
            }
        })
        .on('end', (error) => {
            if (error)
                return console.log('No internet or some network issue, please check whether you are connected to internet.', error);
        });

}

module.exports = {
    //Object destructuring, hence only address property is from argv object is being currently used.  
    getWeatherReport: (address, callback) => {
        //Calling the Weather URL from here... 
        getLocationData(address, (locationData) => {
            getWeatherDetails(locationData, (weatherData) => {
                const fullData = { locationData, weatherData }
                callback(fullData)
            })
        })
    }
}