import { StatusCodes } from "http-status-codes";
import NodeCache from "node-cache";
import { fetchNewsData } from "../utils/fetchNewsData.js";

const newsCache = new NodeCache({ stdTTL: 24 * 60 * 60 });

export const loadNews = async (req, res, next) => {
    try {
        let cachedData = newsCache.get("newsList");

        if (cachedData) {
            res.status(StatusCodes.OK).json(cachedData);
            
            // Refresh cache in the background
            fetchNewsData()
                .then((trendingNews) => newsCache.set("newsList", trendingNews))
                .catch((error) => console.error("Background news fetch failed:", error?.response?.data || error.message));

            return;
        }

        // First-time request, fetch fresh data
        const trendingNews = await fetchNewsData();
        newsCache.set("newsList", trendingNews);

        return res.status(StatusCodes.OK).json(trendingNews);
    } catch (error) {
        console.error("News API Error:", error?.response?.data || error.message);

        let cachedData = newsCache.get("newsList");
        if (cachedData) {
            return res.status(StatusCodes.OK).json(cachedData);
        }

        return next({
            message: "Error while fetching news.",
            statusCode: StatusCodes.BAD_REQUEST,
            error: error?.response?.data || error.message
        });
    }
};

