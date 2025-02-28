import { StatusCodes } from "http-status-codes";
import PlatformUser from "../models/PlatformUser.js";
import Subscription from "../models/Subscription.js";
import Revenue from "../models/Revenue.js";

export const subscribeToPro = async (req, res, next) => {
    const { userId, plan, amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
        (amount)
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid subscription amount." });
    }

    try {
        const user = await PlatformUser.findById(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found." });
        }

        const existingSubscription = await Subscription.findOne({ userId, isActive: true });
        if (existingSubscription) {
            return res.status(StatusCodes.CONFLICT).json({ message: "User already has an active subscription." });
        }

        const newSubscription = await Subscription.create({
            userId,
            plan,
            amountPaid: amount,
            isActive: true,
            startDate: new Date(),
        });

        user.isSubscriber = true;
        user.subscriptionDate = new Date();
        user.expiry = plan === 'monthly'
            ? new Date(new Date().setMonth(new Date().getMonth() + 1))  
            : new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        await user.save();

        const today = new Date().toISOString().split('T')[0];
        const revenue = await Revenue.findOneAndUpdate(
            { date: today, source: "subscription" },
            { $inc: { revenue: amount } },
            { upsert: true, new: true }
        );


        if (!revenue) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error updating revenue data. Please try again.",
            });
        }

        res.status(201).json({ message: 'YAY,subscription successfull!', user, newSubscription, revenue });

    } catch (error) {
        console.error("Error processing subscription:", error);
        next({
            message: "Error processing subscription.",
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            error: error.message,
        });
    }
};


export const unsubscribeToPro = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userFound = await PlatformUser.findByIdAndUpdate(
            id,
            { isSubscriber: false },
            { new: true }
        );

        if (!userFound) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User unsubscribed successfully",
            user: userFound
        });
    } catch (error) {
        console.error("Error unsubscribing user:", error);
        next(error);
    }
};

export const fetchAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find().populate('userId', 'userName');
        res.json(subscriptions);
    } catch (error) {
        throw new Error('Somrthing went wrong!')
    }
}