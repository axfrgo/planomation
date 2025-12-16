import axios from 'axios';

const API_URL = '/api'; // Proxied by Next.js to Gateway

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
    authToken = token;
};

api.interceptors.request.use((config) => {
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});
