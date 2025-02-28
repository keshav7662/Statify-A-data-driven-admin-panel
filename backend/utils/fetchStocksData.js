import axios from "axios";

export const fetchStockData = async () => {
    const response = await axios.get(`${process.env.API_URL}/trending`, {
        headers: { "x-api-key": process.env.API_KEY }
    });
    return response.data.trending_stocks;
};