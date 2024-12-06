import API_KEY from './api.js';
document.addEventListener('DOMContentLoaded', () => {
    let cityInput = document.getElementById("city-input");
    let getWeatherBtn = document.getElementById("get-weather-btn");
    let weatherInfo = document.getElementById('weather-info');
    let cityNameDisplay = document.getElementById("city-name");
    let temperatureDisplay = document.getElementById("temperature");
    let descriptionDisplay = document.getElementById("description");
    let errorMessage = document.getElementById("error-message");




    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    })

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

        const response = await fetch(url);
        if (!response.ok) {
            showError();
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        console.log(data);
        const { name, main, weather } = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temprature is ${main.temp}`;
        descriptionDisplay.textContent = weather[0].description;

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }

});
