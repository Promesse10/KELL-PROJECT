import axios from 'axios';
import Cookies from 'js-cookie';


const instance = axios.create({
  baseURL: 'http://localhost:8009/api/v1', 
  timeout: 1000,
});


instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
