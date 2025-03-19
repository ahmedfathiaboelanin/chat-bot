import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.29:8000/api/v1',
    timeout: 15000, // 15 seconds timeout
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
            return Promise.reject({
                message: 'Request timed out. Please try again.',
                status: 408
            });
        }

        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
});

export default axiosInstance;