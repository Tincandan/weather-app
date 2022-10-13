let entry = document.getElementById('entry');
let btn = document.querySelector('.btn');
let searchform = document.getElementById('searchform');


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
        getForecast(lat, lon, userInput);
    })
    

    entry.value = "";
});

async function getForecast(lat, lon, searchedTerm) {
    console.log(lat, lon, searchedTerm);

        const options = {method: "GET"};

        fetch(
            "api.openweathermap.org/data/2.5/forecast?lat=" + lat + 
            "&lon=" + lon + "&appid=28777b7cfd424a32ac281d53cc0f8b19",
             options
        )
        .then((res) => res.json())
        .then((res) => 
        console.log(res.data))
}