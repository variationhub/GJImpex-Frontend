// apiUtils.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JSON from '../url.json'

const axiosInstance = axios.create({
  // baseURL: 'https://tense-jade-sawfish.cyclic.app/api',
  baseURL: JSON.BASE_URL, // Replace this with your actual backend URL
  timeout: 8000, // Timeout after 5 seconds
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
