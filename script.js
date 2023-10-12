
const API_KEY = '15fc2a8d6a6a903d2358df970e567b70';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

const cityInput = document.getElementById('cityInput');

document.getElementById('searchButton').addEventListener('click', () => {
    const city = cityInput.value;
    getWeatherData(city);

    let lon = document.getElementById('latitude').value;
    let lat = document.getElementById('longitude').value;
});

// Function to save weather data to local storage
function saveWeatherDataToLocalStorage(city, data) {
    localStorage.setItem(city, JSON.stringify(data));
}

// Function to retrieve weather data from local storage
function getWeatherDataFromLocalStorage(city) {
    const storedData = localStorage.getItem(city);
    if (storedData) {
        const data = JSON.parse(storedData);
        displayCurrentWeather(data);
    }
} 

function getWeatherData(city) {
    fetch(`$(API_URL)`)
        .then((response) => response.json())
        .then((data) => {
            displayCurrentWeather(data);
            // Save the data to local storage
            saveWeatherDataToLocalStorage(city, data);
        })
        .catch((error) => console.error('Error:', error));
}

function displayCurrentWeather(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temperature').textContent = data.main.temp + '°C';
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('weatherIcon').style.backgroundImage = `url(http://openweathermap.org/img/wn/${data.weather[0].icon}.png)`;
}

// Check if there is a previously searched city in local storage and display its weather data
const lastSearchedCity = localStorage.getItem('lastSearchedCity');
if (lastSearchedCity) {
    cityInput.value = lastSearchedCity;
    getWeatherDataFromLocalStorage(lastSearchedCity);
}

// Update the last searched city in local storage when a new search is made
cityInput.addEventListener('input', () => {
    localStorage.setItem('lastSearchedCity', cityInput.value);
});
