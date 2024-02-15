// apiUtils.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: 'https://tense-jade-sawfish.cyclic.app/api',
  // baseURL: 'http://192.168.1.9:8000/api',
  timeout: 5000, // Timeout after 5 seconds
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized error (e.g., logout user)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
