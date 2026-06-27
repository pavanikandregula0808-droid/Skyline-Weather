import { fetchTelemetry, buildUrlByCity, buildUrlByCoords } from './api.js';
import { toggleUIState, displayError, populateMetrics } from './dom.js';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const geoBtn = document.getElementById('geo-btn');

function init() {
    searchBtn.addEventListener('click', handleTextSearch);
    geoBtn.addEventListener('click', handleLocalGeoSearch);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleTextSearch();
    });
}

async function handleTextSearch() {
    const inputVal = cityInput.value.trim();
    if (!inputVal) {
        displayError("Input Validation Failure: Query field cannot be empty.");
        return;
    }

    try {
        toggleUIState('loading');
        const url = buildUrlByCity(inputVal);
        const data = await fetchTelemetry(url, inputVal);
        populateMetrics(data);
    } catch (err) {
        displayError(err.message);
    }
}

function handleLocalGeoSearch() {
    if (!navigator.geolocation) {
        displayError("Geolocation is not supported by your browser software.");
        return;
    }
    
    toggleUIState('loading');
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const url = buildUrlByCoords(lat, lon);
                const data = await fetchTelemetry(url, null); // Skip text cache for coordinates
                populateMetrics(data);
            } catch (err) {
                displayError(err.message);
            }
        },
        (error) => {
            displayError(`Location access denied: ${error.message}. Please search manually.`);
        }
    );
}

init();