import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const baseURL = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/`;

// Create an axios instance with the base URL
const axiosClient = axios.create({
    baseURL,
});

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // config.headers["access-control-allow-origin"] = "*";
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default axiosClient;