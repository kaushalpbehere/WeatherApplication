// Get user's location on page load
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeatherByCoordinates(latitude, longitude);
        }, error => {
            console.error("Error getting location:", error);
            // Default to a location if geolocation fails
            fetchWeatherData('London, UK');
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
        fetchWeatherData('London, UK');
    }
});

const weatherForm = document.querySelector('form')
const search = document.querySelector('#searchText')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetchWeatherData(location)
})

function fetchWeatherByCoordinates(lat, lon) {
    $.ajax({
        type: 'GET',
        url: `/weatherData?lat=${lat}&lon=${lon}`,
        success: updateWeatherUI,
        error: handleError
    });
}

function fetchWeatherData(location) {
    $.ajax({
        type: 'GET',
        url: '/weatherData?address=' + location,
        success: updateWeatherUI,
        error: handleError
    });
}

function updateWeatherUI(response) {
    const locationHtml = `
        <div class="col-lg-12 mx-auto">
            <header class="text-center pb-">
                <h1 class="h2">${response.placeName}</h1>
                <p>${response.observationTime} for Latitude: ${response.latitude} and Longitude: ${response.longitude}</p>
            </header>
        </div>`;

    const weatherHtml = `
        <div class="col-lg-12 mx-auto">
            <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded">
                <div class="blockquote-custom-icon bg-info shadow-sm">
                    <i class="fa fa-quote-left text-white"></i>
                </div>
                <div class="weather-details">
                    <p class="mb-0 mt-2 font-italic text-center">${response.temperature}</p>
                    <p class="mb-0 mt-2 font-italic text-center">${response.weatherDescriptions}</p>
                    <p class="mb-0 mt-2 font-italic text-center">${response.windSpeed}</p>
                    <p class="mb-0 mt-2 font-italic text-center">${response.windDegree}</p>
                    <p class="mb-0 mt-2 font-italic text-center">${response.windDir}</p>
                    <p class="mb-0 mt-2 font-italic text-center">${response.pressure}</p>
                    <p class="mb-0 mt-2 font-italic text-center">${response.precipitation}</p>
                    <p class="mb-0 mt-2 font-italic text-center">${response.humidity}</p>
                    <p class="mb-0 mt-2 font-italic text-center">${response.cloudCover}</p>
                    <p class="mb-0 mt-2 font-italic text-center">${response.feelsLike}</p>
                    <p class="mb-0 mt-2 font-italic text-center">${response.uvIndex}</p>
                    <p class="mb-0 mt-2 font-italic text-center">${response.visibility}</p>
                    <p class="mb-0 mt-2 font-italic text-center">${response.isDay}</p>
                </div>
                <footer class="blockquote-footer pt-4 mt-4 border-top text-center">
                    <cite title="Source Title">from NodeLearn</cite>
                </footer>
            </blockquote>
        </div>`;

    document.getElementById('defaultLocation').innerHTML = locationHtml;
    document.getElementById('defaultWeather').innerHTML = weatherHtml;
}

function handleError(xhr, status, err) {
    console.error("Error fetching weather data:", err);
    document.getElementById('defaultLocation').innerHTML = `
        <div class="col-lg-12 mx-auto">
            <header class="text-center pb-">
                <h1 class="h2">Error</h1>
                <p>Unable to fetch weather data. Please try again.</p>
            </header>
        </div>`;
}