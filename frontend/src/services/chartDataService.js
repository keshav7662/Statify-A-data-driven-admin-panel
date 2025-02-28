import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/charts`,
    timeout: 10000,
})

const updateHeader = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ''
    }
}

export const getChartData = async (type) => {
    try {
        const headers = updateHeader();
        if (!headers.Authorization) {
            throw new Error('Authorization token is missing');
        }
        const {data}  = await axios.get('http://localhost:3000/api/charts/chart-data', {
            params: {
                type: type,
            },
            headers: headers
        })
        
        return data || {};
    } catch (error) {
        const message = error.response.data.message;
        throw new Error(message);
    }
}