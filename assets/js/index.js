var button = $(".button");
var cityName = $(".inputValue");
var apiKey = "5686c46a54707e23e5474e6b38ba9744";

// current weather conditions url

const currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + "Miami" + "&Appid=" + apiKey + "&units=imperial";


// fetch("https://api.openweathermap.org/data/2.5/weather?q=" + "Miami" + "&Appid=" + apiKey + "&units=imperial")
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//     })



axios.get(currentUrl)
    .then(function (response) {
        console.log(response);
    })