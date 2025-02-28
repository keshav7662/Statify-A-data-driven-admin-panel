import axios from "axios";
import { toast } from 'react-toastify'
const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/subscription`,
    timeout: 10000,
})

const updateHeader = () => {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    };
}

export const subscribeToPro = async (userId, plan, amount) => {
    try {
        const headers = updateHeader();
        if (!headers.Authorization) {
            throw new Error('Authorization token is missing');
        }
        const response = await api.post(`/`, {
            userId: userId,
            plan: plan,
            amount: amount
        }, { headers });
        return response;
    } catch (error) {
        toast.warning(error.response.data.message)
        
    }
}
export const unsubscribeFromPro = async (id) => {
    try {
        const headers = updateHeader();

        if (!headers.Authorization) {
            throw new Error('Authorization token is missing!');
        }

        const response = await api.put(`/unsubscribe/${id}`, {}, { headers });

        return response.data.message;
    } catch (error) {
        toast.warning(error.response?.data || error.message);
        
    }
}

export const fetchAllSubscribers = async () => {
    try {
        const headers = updateHeader();
        if (!headers) {
            throw new Error('Authorization token is missing');
        }

        const response = await api.get('/', { headers });
        return response;
    } catch (error) {
        toast.warning(error.response?.data || error.message);
    }
}
