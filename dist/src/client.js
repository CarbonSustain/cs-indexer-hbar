import axios from "axios";
export function createClient(baseURL, apiKey) {
    const instance = axios.create({
        baseURL,
        headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : undefined
    });
    return instance;
}
