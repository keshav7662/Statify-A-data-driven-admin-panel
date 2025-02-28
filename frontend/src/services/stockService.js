import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/stock`,
    timeout: 1000
})

const updateHeader = () => {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ' '
    };
}

export const fetchStockData = async () => {
    const headers = updateHeader();
    if (!headers.Authorization) {
        throw new Error('Authorization token is missing!')
    }
    try {
        const response = await api.get('/', { headers })
        return response.data;
    } catch (error) {
        const message = error.response.data.message;
        throw new Error(message);
    }
}