import axios, {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";

const baseURL = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/`;

// Create an axios instance with the base URL
const axiosClient = axios.create({
	baseURL,
});

axiosClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const resource = localStorage.getItem("TOKEN");
		if (resource) {
            const token = JSON.parse(resource).access_token;
			config.headers.Authorization = `Bearer ${token}`;
		}
		// config.headers["access-control-allow-origin"] = "*";
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// Response interceptor to handle errors
axiosClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError) => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem("TOKEN");
			window.location.reload();
		}
		return Promise.reject(error);
	}
);

export default axiosClient;
