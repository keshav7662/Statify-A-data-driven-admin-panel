import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/admin`,
  timeout: 10000,
});


const updateHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
};

export const getAdminDashboardStats = async () => {
  try {
    const headers = updateHeader();

    if (!headers.Authorization) {
      throw new Error('Authorization token is missing');
    }

    const response = await api.get('/dashboard-stats', { headers });
    return response.data;
  } catch (error) {
    const message = error.response.data.message;
    throw new Error(message);
  }
};
export const fetchLoggedInUserData = async () => {
  try {
    const headers = updateHeader();

    if (!headers.Authorization) {
      throw new Error('Authorization token is missing');
    }

    const response = await api.get('/profile', { headers });
    
    return response.data;
  } catch (error) {
    const message = error.response.data.message;
    throw new Error(message);
  }
};

export const fetchUserData = async () => {
  try {
    const headers = updateHeader();

    if (!headers.Authorization) {
      throw new Error('Authorization token is missing');
    }

    const response = await api.get('/all-users', { headers });
    
    return response.data;
  } catch (error) {
    const message = error.response.data.message;
    throw new Error(message);
  }
};
