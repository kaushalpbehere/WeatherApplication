const requests = require('requests')
const chalk = require('chalk')
const NodeGeocoder = require('node-geocoder');

const mapBoxUrl1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapBoxUrl2 = '.json?types=address&access_token=pk.eyJ1Ijoia2F1c2hhbHBiZWhlcmUiLCJhIjoiY2tuZWhza3pnMjY0czJ2dGFkb3FobGthcCJ9.PXoQLcnWXa8fyOWQ1i0PTg&limit=1'
const weatherUrl = 'http://api.weatherstack.com/current?access_key=1e31bf344ad559b01ec66921abc27305&query='

const geocoder = NodeGeocoder({
    provider: 'openstreetmap'
});

const getLocationData = async (address, lat, lon) => {
    try {
        let locationDetails;
        
        if (lat && lon) {
            const locations = await geocoder.reverse({ lat, lon });
            if (locations.length > 0) {
                locationDetails = {
                    latitude: lat,
                    longitude: lon,
                    placeName: locations[0].formattedAddress
                };
            }
        } else {
            const response = await new Promise((resolve, reject) => {
                requests(mapBoxUrl1 + address + mapBoxUrl2)
                    .on('data', resolve)
                    .on('end', reject);
            });
            
            const coordinatesData = JSON.parse(response);
            locationDetails = {
                latitude: coordinatesData.features[0].center[1],
                longitude: coordinatesData.features[0].center[0],
                placeName: coordinatesData.features[0].place_name
            };
        }
        
        return locationDetails;
    } catch (error) {
        console.error(chalk.bgRed.white.bold('Exception encountered while retrieving coordinate data!!!'));
        throw error;
    }
};

const getWeatherDetails = async ({ latitude, longitude }) => {
    try {
        const response = await new Promise((resolve, reject) => {
            requests(weatherUrl + latitude + ',' + longitude)
                .on('data', resolve)
                .on('end', reject);
        });

        const weatherData = JSON.parse(response);
        const current = weatherData.current;

        return {
            observationTime: 'Current weather (At time ' + current.observation_time.toString() + '):',
            temperature: 'Temperature: ' + current.temperature + '°C',
            weatherDescriptions: 'Weather described as: ' + current.weather_descriptions[0],
            windSpeed: 'Wind Speed: ' + current.wind_speed + ' km/h',
            windDegree: 'Wind Degree: ' + current.wind_degree + '°',
            windDir: 'Wind Direction: ' + current.wind_dir,
            pressure: 'Pressure: ' + current.pressure + ' mb',
            precipitation: 'Precipitation: ' + current.precip + ' mm',
            humidity: 'Humidity: ' + current.humidity + '%',
            cloudCover: 'Cloud Cover: ' + current.cloudcover + '%',
            feelsLike: 'Feels Like: ' + current.feelslike + '°C',
            uvIndex: 'UV index: ' + current.uv_index,
            visibility: 'Visibility: ' + current.visibility + ' km',
            isDay: 'Is ' + (current.is_day === "yes" ? "Day" : "Night") + ' time'
        };
    } catch (error) {
        console.error(chalk.bgRed.white.bold('Exception encountered while retrieving weather data!!!'));
        throw error;
    }
};

module.exports = {
    getWeatherReport: async (address, lat, lon) => {
        try {
            const locationData = await getLocationData(address, lat, lon);
            const weatherData = await getWeatherDetails(locationData);
            return { locationData, weatherData };
        } catch (error) {
            throw error;
        }
    }
};