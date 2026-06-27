import { getLocalCache, setLocalCache } from './utils.js';

const API_KEY = '2520e3989adac306b4c91b0a360d23ac';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchTelemetry(endpointUrl, cacheKey) {
    if (cacheKey) {
        const activeCache = getLocalCache(cacheKey);
        if (activeCache) return activeCache;
    }

    const response = await fetch(endpointUrl);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Target location could not be verified.");
        } else {
            throw new Error(`Upstream service fault error: ${response.status}`);
        }
    }

    const payload = await response.json();
    
    if (cacheKey) {
        setLocalCache(cacheKey, payload);
    }
    return payload;
}

export function buildUrlByCity(city) {
    return `${BASE_URL}?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&units=metric`;
}

export function buildUrlByCoords(lat, lon) {
    return `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
}