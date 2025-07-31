import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true, // optional if using cookies
    });

    // Add request interceptor to send tokens
    api.interceptors.request.use((config) => {
        if ( typeof window !== 'undefined'){

        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        if (refreshToken) {
            config.headers['x-refresh-token'] = refreshToken;
        }
        }
        return config;
        });

    // Add response interceptor to update tokens if new ones are sent
    api.interceptors.response.use(
    (response) => {
        if ( typeof window !== 'undefined'){

        const newAccessToken = response.headers['authorization']?.split(' ')[1];
        const newRefreshToken = response.headers['x-refresh-token'];

        if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
        }
        if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
        }}

        return response;
    },
    (error) => {
        if (error.response?.status === 403) {
        // You can choose to redirect to login
        window.location.href = '/admin';
        }
        return Promise.reject(error);
    }
    );

export default api;





