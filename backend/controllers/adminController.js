import { StatusCodes } from "http-status-codes";
import PlatformUser from "../models/PlatformUser.js"
import News from "../models/News.js";
import Weather from "../models/Weather.js";
import Stocks from "../models/Stocks.js";
import Visitors from "../models/Visitors.js";
import Revenue from "../models/Revenue.js";
import { errorHandler } from '../middlewares/errorHandler.js'
import { updateGrowthMetrics } from "../utils/updateGrowthMetrics.js";

export const findAllUser = async (req, res, next) => {
    try {
        const allExistingUser = await PlatformUser.find();
        if (!allExistingUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Users not available.' })
        }

        res.status(StatusCodes.OK).json({
            users: allExistingUser
        })
    } catch (error) {
        next({
            message: 'Something went wrong!',
            statusCode: StatusCodes.BAD_REQUEST
        });
    }
}

export const getAdminDashboardStats = async (req, res, next) => {
    try {
        const [totalUsers, totalVisitors, totalRevenueData, totalStocks, totalNews, totalWeatherReports] = await Promise.all([
            PlatformUser.countDocuments(),
            Visitors.findOne({ key: 'visitor_count' }),
            Revenue.aggregate([{ $group: { _id: null, totalRevenue: { $sum: "$revenue" } } }]),
            Stocks.countDocuments(),
            News.countDocuments(),
            Weather.countDocuments()
        ]);

        const totalRevenue = totalRevenueData[0]?.totalRevenue || 0;
        const [userGrowth, visitorGrowth, revenueGrowth] = await Promise.all([
            updateGrowthMetrics('PlatformUser', totalUsers),
            updateGrowthMetrics('Visitors', totalVisitors?.liveCount),
            updateGrowthMetrics('Revenue', totalRevenue),
        ]);

        const totalProducts = totalUsers + totalVisitors?.liveCount + totalRevenue || 1;
        const productDistribution = [
            { label: 'News', percentage: (totalNews / totalProducts) * 100 },
            { label: 'Stocks', percentage: (totalStocks / totalProducts) * 100 },
            { label: 'Weather', percentage: (totalWeatherReports / totalProducts) * 100 },
        ];

        res.status(StatusCodes.OK).json({
            totalUsers,
            totalVisitors: totalVisitors?.liveCount || 0,
            totalRevenue,
            totalStocks,
            totalNews,
            totalWeatherReports,
            productDistribution,
            userGrowth,
            visitorGrowth,
            revenueGrowth,
        });
    } catch (error) {
        console.error(error);
        errorHandler(next, 'Failed to fetch admin dashboard stats', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export const manageAdminRoles = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (req.user.role !== 'admin') {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Access denied. Insufficient permissions.' })
        }
        const user = await PlatformUser.findById(id);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User doesn't exist!" });
        }
        user.role = role;
        await user.save();
        res.status(StatusCodes.OK).json({ message: 'User role updated successfully.' });

    } catch (error) {
        next({
            message: 'Error in updating role!',
            statusCode: StatusCodes.BAD_REQUEST
        });
    }
}

export const fetchUserProfile = async (req, res) => {
    try {
        const { id } = req.user;

        const foundUser = await PlatformUser.findOne({ _id: id });
        if (!foundUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'user not found!' });
        }

        return res.status(StatusCodes.OK).json(foundUser);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};
