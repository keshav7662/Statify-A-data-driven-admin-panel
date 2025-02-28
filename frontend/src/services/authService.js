import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth`,
  timeout: 10000
})

//register api
export const register = async (userData) => {
  
   try {
    const response = await api.post(`/register`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

//login api
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    
  }
}