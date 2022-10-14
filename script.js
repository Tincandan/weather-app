let entry = document.getElementById('entry');
let btn = document.querySelector('.btn');
let searchform = document.getElementById('searchform');
let cityName = document.getElementById('city');
let forecastDate;
let forecastTemp;
let forecastWind;
let forecastHumid;
let forecastWeather;
let date = [];
let temp = [];
let wind = [];
let humid = [];
let weather = [];


let testCity = "Denver";


searchform.addEventListener('submit', function search(e) {
    e.preventDefault();

    let userInput = entry.value.trim();

    const options = {method: "GET"};

    //during setup and testing, use testCity, in place of userInput

fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&limit=5&appid=28777b7cfd424a32ac281d53cc0f8b19",
    options
)
    .then((response) => response.json())
    .then((response) => {
        let lat = response[0].lat;
        let lon = response[0].lon;
        let city = response[0].name;
        getForecast(lat, lon, city);
    })
    

    entry.value = "";
});

async function getForecast(lat, lon, city) {
    cityName.innerText = city;
    const options = {method: "GET"};

    fetch(
        "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + 
        "&lon=" + lon + "&appid=28777b7cfd424a32ac281d53cc0f8b19&units=imperial",
        options
    )

    .then((res) => res.json())
    .then((data) => {
        for (let i = 0; i < 39; i=i+7) {
            //instead of i++, i=i+(anynumber), can be used to make it grow by a different number than just one.
            //we do this here so that it goes past the sets of data of the day, which are 3 hr segments(3*8=24)
            //and skip to the next day. and the reason i <39 is because the array has 40 lists, and cannot return
            //an array with a higher number since they do not exist in this data.
        date = data.list[i].dt_txt
        weather = data.list[i].weather[0].icon;
            //placing the data.list[i].dt_txt inside [], makes the info be held in an array.

            
        temp = data.list[i].main.temp;
        wind = data.list[i].wind.speed;
        humid = data.list[i].main.humidity;
        displayForecast(i, date, weather, temp, wind, humid);
        console.log(data);
        console.log(date, weather, temp, wind, humid)
    }})}

        async function displayForecast(i, date, weather, temp, wind, humid) {
            console.log('date'+i);
            let forecastDate = document.querySelector('.date'+i.value);
            let forecastTemp = document.querySelector('.temp'+i.value);
            let forecastWind = document.querySelector('.wind'+i.value);
            let forecastHumid = document.querySelector('.humidity'+i.value);
            let forecastWeather = document.querySelector('.weathersign'+i.value);

            forecastDate.innerHTML = date;
            forecastTemp.innerHTML = 'temp: ' + temp;
            forecastWind.innerHTML = 'wind: ' + wind + 'mph';
            forecastHumid.innerHTML = 'humidity: ' + humid + '%';
            
            let iconurl = "http://openweathermap.org/img/w/" + weather + ".png";
            $('#wicon').attr('src', iconurl)
        }

   