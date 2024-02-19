import axios from 'axios';
import JSON from '../url.json'
// const BASE_URL = 'https://tense-jade-sawfish.cyclic.app/api'; // Replace this with your actual backend URL
const BASE_URL = JSON.BASE_URL; // Replace this with your actual backend URL

const AuthService = {
  login: async (phone, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        phone,
        password,
      });

      return response?.data;
    } catch (error) {
      console.log(error);
      return false
    }
  },
};

export default AuthService;
