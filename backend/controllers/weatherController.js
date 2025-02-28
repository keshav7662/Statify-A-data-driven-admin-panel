import { StatusCodes } from "http-status-codes";
import axios from "axios";

const WEATHER_API_URL = process.env.WEATHER_API_URL;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export const getWeatherData = async (req, res, next) => {
    try {

        const {country} = req.query

        const weatherResponse = await axios.get(WEATHER_API_URL, {
            params: {
                key: WEATHER_API_KEY,
                q: country,
                aqi: "yes",
            },
        });

        const weatherData = weatherResponse.data;

        return res.status(StatusCodes.OK).json({
            location: weatherData.location.name,
            country: weatherData.location.country,
            temperature: weatherData.current.temp_c,
            condition: weatherData.current.condition.text,
            icon: weatherData.current.condition.icon,
            humidity: weatherData.current.humidity,
            windSpeed: weatherData.current.wind_kph,
            airQuality: weatherData.current.air_quality,
            lastUpdated: weatherData.current.last_updated,
        });

    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        next({
            message: "Failed to fetch weather data.",
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            error: error.message,
        });
    }
};
