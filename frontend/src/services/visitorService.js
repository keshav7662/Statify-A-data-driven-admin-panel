import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/visitor`,
    timeout: 10000,
})

const updateHeader = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    };
};

export const trackVisitors = async () => {
    try {
        const headers = updateHeader();
        if (!headers.Authorization) {
            throw new Error('Authorization token is missing');
        }
        const response = await api.post('/track', {}, { headers });
    } catch (error) {
        console.error('Error tracking visitor count:', error);
        
    }
}