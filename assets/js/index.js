// var button = $(".button");
var button = document.querySelector(".button");
var cityName = document.querySelector('.inputValue');
var apiKey = "5686c46a54707e23e5474e6b38ba9744";

// current weather conditions url

const currentUrl = "https://api.openweathermap.org/data/2.5/weather?q="
const forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="


// function for both api calls
function getData() {
    fetch(currentUrl + cityName.value + "&Appid=" + apiKey + "&units=imperial")
        .then(response => response.json())
        .then(data => {
            let lat = data.coord.lat
            let lon = data.coord.lon
            console.log(data)
            fetch(forecastUrl + lat + "&lon=" + lon + "&appid=5686c46a54707e23e5474e6b38ba9744&units=imperial&exclude=hourly,minutely,current,alerts")
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
            var tempValue = data['main']['temp'];
            console.log(tempValue);
            $("#current-temp").text(tempValue)


        })



}

// function triggering api call when submit button is clicked
button.addEventListener("click", getData)



