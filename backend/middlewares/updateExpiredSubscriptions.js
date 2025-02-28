import cron from 'node-cron';
import PlatformUser from '../models/PlatformUser.js';

const updateExpiredSubscriptions = async () => {
    try {
        const expiredUsers = await PlatformUser.find({ expiry: { $lt: new Date() }, isSubscriber: true });

        if (expiredUsers.length > 0) {
            await PlatformUser.updateMany({ expiry: { $lt: new Date() } }, { isSubscriber: false });
            (`Updated ${expiredUsers.length} expired subscriptions.`);
        }
    } catch (error) {
        console.error('Error updating expired subscriptions:', error);
    }
};


cron.schedule('0 0 * * *', updateExpiredSubscriptions);

export default updateExpiredSubscriptions;
