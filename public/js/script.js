const weatherForm = document.querySelector('form')
// console.log(weatherForm)
var search = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    //Location value is with us now. 
    /* If there is an error make sure you add link to this script file
     the the bottom of the page instead of adding it into the header. */
    fetch('http://localhost:3000/weather?address=' + location)
        .then((response) => {
            console.log(response)
        })
})