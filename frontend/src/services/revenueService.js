import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/revenue`, // Corrected baseURL
    timeout: 10000,
});

const updateHeader = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    };
};

export const getRevenue = async (type, year) => {
    const headers = updateHeader();
    if (!headers.Authorization) {
        throw new Error("Authorization token is missing");
    }
    const response = await api.get("/", {
        params: {
            type: type,
            year: year
        },
        headers: headers
    });
    return response.data?.data || [];
};



