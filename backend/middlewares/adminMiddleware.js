import { StatusCodes } from "http-status-codes";

export const authorizeAdmin = async (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Access denied. Insufficient permissions.' })
        }
        next();
    } catch (error) {
        next({
            message: "An error occurred during authorization.",
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}