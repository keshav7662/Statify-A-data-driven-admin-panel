import axios from "axios"

export const fetchNewsData = async () => {
    const response = await axios.get(`${process.env.API_URL}/news`, {
        headers: { "x-api-key": process.env.API_KEY }
    })
    return response.data;
}