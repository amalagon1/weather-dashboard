// var button = $(".button");
var button = document.querySelector(".button");
var cityName = document.querySelector('.inputValue');
var apiKey = "5686c46a54707e23e5474e6b38ba9744";
var currentPic = document.getElementById("current-icon");
const forecastEl = document.getElementById("forecast");

// current weather conditions url

const currentUrl = "https://api.openweathermap.org/data/2.5/weather?q="
const forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="


//dynamically change city name
function title() {
    // let date = new Date(data.dt * 1000)
    // let dateStr = date.toLocaleDateString("en-US");
    $("#title").text(cityName.value);
    // console.log(dateStr);

}

// }
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

            //extract data for current weather conditions
            var temp = data['main']['temp'];
            var humid = data['main']['humidity'];
            var wind = data['wind']['speed'];
            var icon = data.weather[0].icon;
            //get date
            let date = new Date(data.dt * 1000).toLocaleDateString("en-US")

            $("#currentDate").text(date);
            $("#current-temp").text(temp);
            $("#current-humidity").text(humid);
            $("#current-wind").text(wind);

            // $("#current-icon").text("https://openweathermap.org/img/w/" + icon + ".png");
            // $(".current-icon").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
            // ask tutor about setAttribute with jquery
            currentPic.setAttribute("src", "https://openweathermap.org/img/w/" + icon + ".png");


            console.log(date)

            // display 5-day forecast

            //added lat and lon to pass into next function
            displayForecast(data);


        })

    function displayForecast(data) {
        console.log("DISPLAY FORECAST", data)

        let forecastContainer = document.getElementById("forecast");
        forecastContainer.innerHTML = ""

        for (let i = 1; i <= 5; i++) {
            let card = document.createElement("div");
            card.classList = "card mb-r me-2";
            card.style = "max-width: 12rem";

            let cardBody = document.createElement("div");
            cardBody.classList = "card-body"

            // let iconImg = document.createElement('img')
            // iconImg.setAttribute('src', `http://openweathermap.org/img/w/${data[i].weather[0].icon}.png`)
            // cardBody.appendChild(iconImg);

            let tempText = document.createElement("p")
            tempText.classList = "card-text"
            tempText.innerHTML = `Temp: ${data[i].daily.temp}°F`
            cardBody.appendChild(tempText)

        }
    }

    title(cityName)

}




// function triggering api call when submit button is clicked
button.addEventListener("click", getData)