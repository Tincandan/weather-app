let entry = document.getElementById('entry');
let btn = document.querySelector('.btn');
let searchform = document.getElementById('searchform');
let cityName = document.getElementById('city');
let forecastDate = document.getElementsByClassName('date');
let forecastTemp = document.getElementsByClassName('temp');
let forecastWind = document.getElementsByClassName('wind');
let forecastHumid = document.getElementsByClassName('humidity')

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
        for (let i = 0; i < 39; i = i + 8) {

        let date = data.list[i].dt_txt
        let weather = data.list[i].weather[0].icon;
        let iconurl = "http://openweathermap.org/img/w/" + weather + ".png";
            $('#wicon').attr('src', iconurl);
        let temp = data.list[i].main.temp;
        let wind = data.list[i].wind.speed;
        let humid = data.list[i].main.humidity;
        displayForecast(date, temp, wind, humid);
        console.log(data);
        console.log(date, temp, wind, humid)
    }})}

        async function displayForecast(date, temp, wind, humid) {
            for (i=0;i<5;i++) {
            forecastDate[i].innerText = date;
            forecastTemp[i].innerText = 'temp: ' + temp;
            forecastWind[i].innerText = 'wind: ' + wind + 'mph';
            forecastHumid[i].innerText = 'humidity: ' + humid + '%';
        }}