import axios from "axios";

const baseURL = "https://hotelapplicationbackend.onrender.com/api/v1";
const instance = axios.create({
    baseURL,
    timeout:5000,
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:true,
});
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance