import PlatformUser from "../models/PlatformUser.js";
import Visitors from "../models/Visitors.js";

export const getUserGrowth = async (req, res) => {
    const { type, year } = req.query;
    try {
        let data = [];

        switch (type) {
            case 'daily':
                data = await PlatformUser.aggregate([
                    {
                        $group: {
                            _id: {
                                date: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
                            },
                            userCount: { $sum: 1 },
                        },
                    },
                    { $sort: { '_id.date': 1 } },
                ]);
                data = data.map((d) => ({ date: d._id.date, count: d.userCount }));
                break;

            case 'monthly':
                const selectedYear = year || new Date().getFullYear();
                data = await PlatformUser.aggregate([
                    {
                        $match: {
                            updatedAt: {
                                $gte: new Date(`${selectedYear}-01-01`),
                                $lte: new Date(`${selectedYear}-12-31`),
                            },
                        },
                    },
                    {
                        $group: {
                            _id: { $month: '$updatedAt' },
                            userCount: { $sum: 1 },
                        },
                    },
                ]);
                data = Array.from({ length: 12 }, (_, i) => ({
                    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
                    count: data.find((d) => d._id === i + 1)?.userCount || 0,
                }));
                break;

            case 'yearly':
                data = await PlatformUser.aggregate([
                    {
                        $group: {
                            _id: { $year: '$updatedAt' },
                            userCount: { $sum: 1 },
                        },
                    },
                ]);
                data = data.map((d) => ({ year: d._id, count: d.userCount }));
                break;
        }

        res.json({ type, data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVisitorGrowth = async (req, res) => {
    const { type, year } = req.query;
    try {
        let data = [];

        switch (type) {
            case 'daily':
                data = await Visitors.aggregate([
                    {
                        $group: {
                            _id: {
                                date: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
                            },
                            liveCount: { $sum: '$liveCount' },
                        },
                    },
                    { $sort: { '_id.date': 1 } },
                ]);
                data = data.map((d) => ({ date: d._id.date, count: d.liveCount }));
                break;

            case 'monthly':
                const selectedYear = year || new Date().getFullYear();
                data = await Visitors.aggregate([
                    {
                        $match: {
                            updatedAt: {
                                $gte: new Date(`${selectedYear}-01-01`),
                                $lte: new Date(`${selectedYear}-12-31`),
                            },
                        },
                    },
                    {
                        $group: {
                            _id: { $month: '$updatedAt' },
                            liveCount: { $sum: '$liveCount' },
                        },
                    },
                ]);
                data = Array.from({ length: 12 }, (_, i) => ({
                    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
                    count: data.find((d) => d._id === i + 1)?.liveCount || 0,
                }));
                break;

            case 'yearly':
                data = await Visitors.aggregate([
                    {
                        $group: {
                            _id: { $year: '$updatedAt' },
                            liveCount: { $sum: '$liveCount' },
                        },
                    },
                ]);
                data = data.map((d) => ({ year: d._id, count: d.liveCount }));
                break;
        }

        res.json({ type, data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};