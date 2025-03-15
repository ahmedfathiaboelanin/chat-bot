import axios from "axios";

const axiosInsatnce = axios.create({
    baseURL: 'http://192.168.1.27:8000/api/v1',
})


// Add a request interceptor to dynamically set the Authorization header
axiosInsatnce.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


axiosInsatnce.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
})

export default axiosInsatnce;