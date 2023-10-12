const API_KEY = '15fc2a8d6a6a903d2358df970e567b70';

const cityInput = document.getElementById('cityInput');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');

document.getElementById('searchButton').addEventListener('click', () => {
    const city = cityInput.value;
    getWeatherData(city);
    const lon = longitudeInput.value;
    const lat = latitudeInput.value;
});

function saveWeatherDataToLocalStorage(city, data) {
    localStorage.setItem(city, JSON.stringify(data));
}

function getWeatherDataFromLocalStorage(city) {
    const storedData = localStorage.getItem(city);
    if (storedData) {
        const data = JSON.parse(storedData);
        displayCurrentWeather(data);
    }
}

function getWeatherData(city) {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            displayCurrentWeather(data);
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

const lastSearchedCity = localStorage.getItem('lastSearchedCity');
if (lastSearchedCity) {
    cityInput.value = lastSearchedCity;
    getWeatherDataFromLocalStorage(lastSearchedCity);
}

cityInput.addEventListener('input', () => {
    localStorage.setItem('lastSearchedCity', cityInput.value);
});
