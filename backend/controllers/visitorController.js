import { StatusCodes } from 'http-status-codes';
import Visitor from '../models/Visitors.js';

export const trackVisitors = async (req, res, next) => {
    try {
        const currentTime = Date.now();

        // Find the visitor data (or create a new document if it doesn't exist)
        let visitorData = await Visitor.findOne({ key: 'visitor_count' });

        if (!visitorData) {
            // Initialize the document if it doesn't exist
            visitorData = new Visitor({
                liveCount: 1,
            });
            await visitorData.save();
            return res.status(StatusCodes.OK).json({
                liveCount: visitorData.liveCount,
            });
        }

        visitorData.liveCount += 1;
        await visitorData.save();
        res.status(StatusCodes.OK).json({
            liveCount: visitorData.liveCount,
        });
    } catch (error) {
        console.error('Error updating visitor data:', error);
        next({
            message: 'Error in tracking visitors.',
            statusCode: StatusCodes.BAD_REQUEST,
            error: error.message,
        });
    }
};


