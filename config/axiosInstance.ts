import axios from "axios";
import { BACKEND_BASE_URL_DEV } from "@/lib/endpoints";
import { Cookies } from "react-cookie";

export const axiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL_DEV || 'http://localhost:5050/api',
});

const cookies = new Cookies();

axiosInstance.interceptors.request.use((config) => {
    const token = cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
        sessionStorage.setItem('prev', window.location.pathname)
        // window.location.href = '/login';
        return;
    }

    return Promise.reject(error);
});