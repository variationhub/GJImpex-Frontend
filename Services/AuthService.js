import axios from 'axios';

const BASE_URL = 'https://tense-jade-sawfish.cyclic.app/api'; // Replace this with your actual backend URL

const AuthService = {
  login: async (phone, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        phone,
        password,
      });
      return response.data; // Assuming your backend returns some user data upon successful login
    } catch (error) {
      throw error; // You can handle errors in your component
    }
  },
};

export default AuthService;
