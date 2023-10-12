const API_KEY = '15fc2a8d6a6a903d2358df970e567b70';

const cityInput = document.getElementById('cityInput');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');
const forecastList = document.getElementById('forecastList');

document.getElementById('searchButton').addEventListener('click', () => {
    const city = cityInput.value;
    getWeatherData(city);
    const lon = longitudeInput.value;
    const lat = latitudeInput.value;

    // Fade in animation
    document.querySelector('.current-weather').classList.add('fadeIn');
    const forecastItems = document.querySelectorAll('.forecast-item');
    forecastItems.forEach(item => {
        item.classList.add('fadeIn');
    });
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
            getFiveDayForecast(city);
        })
        .catch((error) => console.error('Error:', error));
}

function displayCurrentWeather(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temperature').textContent = data.main.temp + '°C';
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('weatherIcon').style.backgroundImage = `url(http://openweathermap.org/img/wn/${data.weather[0].icon}.png)`;
}

function getFiveDayForecast(city) {
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            displayFiveDayForecast(data.list);
        })
        .catch((error) => console.error('Error:', error));
}

function displayFiveDayForecast(forecastData) {
    forecastList.innerHTML = ''; // Clear the forecast list

    for (let i = 0; i < forecastData.length; i += 8) {
        const forecast = forecastData[i];
        const date = new Date(forecast.dt * 1000); // Convert timestamp to date
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = forecast.main.temp;
        const description = forecast.weather[0].description;

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <h3>${day}</h3>
            <p>Temp: ${temp}°C</p>
            <p>${description}</p>
        `;

        forecastList.appendChild(forecastItem);
    }
}

const lastSearchedCity = localStorage.getItem('lastSearchedCity');
if (lastSearchedCity) {
    cityInput.value = lastSearchedCity;
    getWeatherDataFromLocalStorage(lastSearchedCity);
}
