import axios from 'axios';

const BASE_URL = 'https://tense-jade-sawfish.cyclic.app/api'; // Replace this with your actual backend URL
// const BASE_URL = 'http://192.168.1.9:8000/api'; // Replace this with your actual backend URL

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
