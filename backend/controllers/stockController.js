import { StatusCodes } from "http-status-codes";
import NodeCache from "node-cache";
import { fetchStockData } from '../utils/fetchStocksData.js'
const stockCache = new NodeCache({ stdTTL: 24 * 60 * 60 });


export const loadStocks = async (req, res, next) => {
    try {
        let cachedData = stockCache.get("stockList");

        if (cachedData) {
            // Return cached data immediately while refreshing in the background
            res.status(StatusCodes.OK).json(cachedData);

            // Refresh cache in background (but don't block the response)
            fetchStockData()
                .then((trendingStocks) => {
                    const stockList = [...trendingStocks.top_gainers, ...trendingStocks.top_losers].map((data) => ({
                        companyName: data.ric,
                        stockSymbol: `https://logo.clearbit.com/${data.company_name.toLowerCase().replace(/\s/g, '')}.com`,
                        currentPrice: data.price,
                        netChange: data.net_change,
                        percentageChange: data.percentage_change,
                        overallRating: data.overall_rating,
                        exchangeName: "NSE"
                    }));

                    stockCache.set("stockList", stockList);
                })
                .catch((error) => console.error("Background stock fetch failed:", error?.response?.data || error.message));

            return;
        }

        // Fetch fresh data (first-time request)
        const trendingStocks = await fetchStockData();
        const stockList = [...trendingStocks.top_gainers, ...trendingStocks.top_losers].map((data) => ({
            companyName: data.ric,
            stockSymbol: `https://logo.clearbit.com/${data.company_name.toLowerCase().replace(/\s/g, '')}.com`,
            currentPrice: data.price,
            netChange: data.net_change,
            percentageChange: data.percentage_change,
            overallRating: data.overall_rating,
            exchangeName: "NSE"
        }));

        stockCache.set("stockList", stockList);
        return res.status(StatusCodes.OK).json(stockList);
    } catch (error) {
        console.error("Stock API Error:", error?.response?.data || error.message);

        let cachedData = stockCache.get("stockList");
        if (cachedData) {
            // Serve old cached data if available
            return res.status(StatusCodes.OK).json(cachedData);
        }

        return next({
            message: "Error while fetching stocks.",
            statusCode: StatusCodes.BAD_REQUEST,
            error: error?.response?.data || error.message
        });
    }
};

