import axios from "axios";

const axiosInsatnce = axios.create({
    baseURL: 'http://192.168.1.27:8000/api/v1',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

axiosInsatnce.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        // localStorage.removeItem('token');
        // window.location.href = '/login';
    }
    return Promise.reject(error);
})

export default axiosInsatnce;