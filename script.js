let entry = document.getElementById('entry');
let btn = document.querySelector('.btn');
let searchform = document.getElementById('searchform');


let testCity = "Denver";


searchform.addEventListener('submit', function search(e) {
    e.preventDefault();

    let userInput = entry.value.trim();

    const options = {
    method: "GET"
    };

    //during setup and testing, use testCity, in place of userInput

fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&limit=5&appid=28777b7cfd424a32ac281d53cc0f8b19",
    options
)
    .then((response) => response.json())
    .then((response) => {
        filterResults(response.data, userInput);
    })
    

    entry.value = "";
});

function filterResults(cityInfo, searchedTerm) {
    for (var i = 0; i < cityInfo.length; i++) {
        if (
            cityInfo[i].country === "US"  &&
            cityInfo[i].name.toLowerCase() === searchedTerm.toLowerCase()
            ){
            console.log("found it");
            //displayCityInfo(cityInfo[i]);
        }
        }
}

