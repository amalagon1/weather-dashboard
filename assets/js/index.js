// var button = $(".button");
var button = document.querySelector(".button");
var cityName = document.querySelector('.inputValue');
var apiKey = "5686c46a54707e23e5474e6b38ba9744";
var currentPic = document.getElementById("current-icon");
const forecastEl = document.getElementById("forecast");
const forecastText = document.getElementById("day")

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
// displays current weather conditions
function displayCurrent() {
    fetch(currentUrl + cityName.value + "&Appid=" + apiKey + "&units=imperial")
        .then(response => response.json())
        .then(data => {
            let lat = data.coord.lat
            let lon = data.coord.lon
            console.log(data)

            //extract data for current weather conditions
            // = data['main']['temp'];
            var temp = (Math.floor(data['main']['temp']));
            var humid = data['main']['humidity'];
            var wind = (Math.floor(data['wind']['speed']));
            var icon = data.weather[0].icon;
            //get date
            let date = new Date(data.dt * 1000).toLocaleDateString("en-US")

            $("#currentDate").text(date);
            $("#current-temp").text(temp + ` F`);
            $("#current-humidity").text(humid + ` %`);
            $("#current-wind").text(wind + ` MPH`);

            // $("#current-icon").text("https://openweathermap.org/img/w/" + icon + ".png");
            // $(".current-icon").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
            // ask tutor about setAttribute with jquery
            currentPic.setAttribute("src", "https://openweathermap.org/img/w/" + icon + ".png");


            console.log(date)

            // display 5-day forecast

            //added lat and lon to pass into next function
            displayForecast(lat, lon);


        })



    title(cityName)

}

function displayForecast(lat, lon) {
    fetch(forecastUrl + lat + "&lon=" + lon + "&appid=5686c46a54707e23e5474e6b38ba9744&units=imperial&exclude=hourly,minutely,current,alerts")
        .then(response => response.json())
        .then(data => {
            console.log(data)

            const daily = data.daily

            forecastText.style.display = 'block';

            for (let i = 1; i <= 5; i++) {
                let forecastContainer = document.getElementById("forecast");

                let date = new Date(daily[i].dt * 1000).toLocaleDateString("en-US");

                let cardEl = document.createElement("div");
                cardEl.classList = 'card';
                // let forecastContainer = document.querySelector(".row")
                let title = document.createElement("h4");
                title.textContent = date
                title.classList = "title"
                cardEl.append(title)
                forecastContainer.append(cardEl);


                // let dateEl = document.createElement("div")
                // dateEl.innerHTML = date

                // cardEl.append(dateEl);
                // let card = document.createElement("div");
                // card.classList = "card mb-r me-2";
                // card.style = "max-width: 12rem";

                // let cardBody = document.createElement("div");
                // cardBody.classList = "card-body"

                let iconImg = document.createElement('img')
                iconImg.setAttribute('src', `http://openweathermap.org/img/w/${daily[i].weather[0].icon}.png`)
                iconImg.classList = "img"
                // cardBody.appendChild(iconImg);
                // cardEl.appendChild(cardBody);
                cardEl.appendChild(iconImg);

                let tempMaxEl = document.createElement('p');
                let tempMinEl = document.createElement('p');
                let tempMax = Math.floor(daily[i].temp.max);
                let tempMin = Math.floor(daily[i].temp.min);
                tempMaxEl.innerHTML = `High: ` + tempMax + ` °F`
                tempMinEl.innerHTML = `Low: ` + tempMin + ` °F`
                cardEl.appendChild(tempMaxEl);
                cardEl.appendChild(tempMinEl);

                let humidEl = document.createElement('p');
                let humidity = daily[i].humidity;
                humidEl.innerHTML = `Humidy: ` + humidity + `%`
                cardEl.appendChild(humidEl);

                let windEl = document.createElement('p');
                let wind = Math.floor(daily[i].wind_speed);
                windEl.innerHTML = `Wind: ` + wind + ` MPH`
                cardEl.appendChild(windEl);



            }

        })


    // forecastContainer.innerHTML = ""

}


// function triggering api call when submit button is clicked
button.addEventListener("click", displayCurrent)