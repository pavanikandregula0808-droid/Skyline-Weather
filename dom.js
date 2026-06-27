import { capitalizePhrase } from './utils.js';

const weatherCard = document.getElementById('weather-card');
const errorMessage = document.getElementById('error-message');
const loadingSpinner = document.getElementById('loading-spinner');

export function toggleUIState(state) {
    if (state === 'loading') {
        loadingSpinner.className = "spinner-visible";
        weatherCard.className = "weather-hidden";
        errorMessage.className = "error-hidden";
    } else if (state === 'success') {
        loadingSpinner.className = "spinner-hidden";
        weatherCard.className = "weather-visible";
        errorMessage.className = "error-hidden";
    }
}

export function displayError(message) {
    loadingSpinner.className = "spinner-hidden";
    weatherCard.className = "weather-hidden";
    errorMessage.textContent = message;
    errorMessage.className = "error-visible";
}

export function populateMetrics(data) {
    const { name, sys: { country }, main: { temp, humidity }, wind: { speed }, weather } = data;
    const [{ description, icon }] = weather;

    document.getElementById('location-name').textContent = `${name}, ${country}`;
    document.getElementById('temperature').textContent = `${Math.round(temp)}°C`;
    document.getElementById('weather-description').textContent = capitalizePhrase(description);
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('wind-speed').textContent = `${speed} m/s`;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    toggleUIState('success');
}