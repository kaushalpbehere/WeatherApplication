const weatherForm = document.querySelector('form')
// console.log(weatherForm)
var search = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    $.ajax({
        type: 'GET',
        url: '/weatherData?address=' + location,
        success: function (response) {
            console.log(response)
            console.log(response.forecast)
            console.log(response.location)

            var htmlLocationData = '<div class="col-lg-12 mx-auto"><header class="text-center pb-">'
                + '<h1 class="h2"> ' + response.placeName + '</h1>'
                + '<p> ' + response.observationTime + ''
                + ' for Latitude: ' + response.latitude + ''
                + ' and Longitude: ' + response.longitude + ' </p>'
                + ' </header></div>'


            var htmlWeatherData = '  <div class="col-lg-12 mx-auto"><blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded"><div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>'
                + '<p class="mb-0 mt-2 font-italic text-center"> ' + response.temperature + ' </p>'
                + '<p class="mb-0 mt-2 font-italic text-center"> ' + response.weatherDescriptions + ' </p>'
                + '<p class="mb-0 mt-2 font-italic text-center"> ' + response.windSpeed + ' </p>'
                + '<p class="mb-0 mt-2 font-italic text-center"> ' + response.windDegree + ' </p>'
                + '<p class="mb-0 mt-2 font-italic text-center"> ' + response.windDir + ' </p>'
                + '<p class="mb-0 mt-2 font-italic text-center"> ' + response.pressure + ' </p>'
                + '<p class="mb-0 mt-2 font-italic text-center"> ' + response.precipitation + ' </p>'
                + '<p class="mb-0 mt-2 font-italic text-center"> ' + response.humidity + ' </p>'
                + '<p class="mb-0 mt-2 font-italic text-center"> ' + response.cloudCover + ' </p>'
                + '<p class="mb-0 mt-2 font-italic text-center"> ' + response.feelsLike + ' </p>'
                + '<p class="mb-0 mt-2 font-italic text-center"> ' + response.uvIndex + ' </p>'
                + '<p class="mb-0 mt-2 font-italic text-center"> ' + response.visibility + ' </p>'
                + '<p class="mb-0 mt-2 font-italic text-center"> ' + response.isDay + ' </p>'
                + '< footer class="blockquote-footer pt-4 mt-4 border-top text-center" ><cite title="Source Title"> from NodeLearn</cite></footer ></blockquote > </div > '

                document.getElementById('defaultLocation').innerHTML=htmlLocationData
            
                document.getElementById('defaultWeather').innerHTML=htmlWeatherData
            

        },
        error: function (xhr, status, err) {
            console.log(xhr.responseText)
        }
    })
})