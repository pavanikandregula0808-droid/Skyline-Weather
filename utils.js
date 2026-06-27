export function getLocalCache(key) {
    const cachedItem = sessionStorage.getItem(`skyline_cache_${key.toLowerCase()}`);
    if (!cachedItem) return null;

    const { timestamp, data } = JSON.parse(cachedItem);
    if (Date.now() - timestamp > 15 * 60 * 1000) { // 15 Minute expiration
        sessionStorage.removeItem(`skyline_cache_${key.toLowerCase()}`);
        return null;
    }
    return data;
}

export function setLocalCache(key, data) {
    const cachePayload = { timestamp: Date.now(), data };
    sessionStorage.setItem(`skyline_cache_${key.toLowerCase()}`, JSON.stringify(cachePayload));
}

export function capitalizePhrase(str) {
    if (!str) return '';
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}