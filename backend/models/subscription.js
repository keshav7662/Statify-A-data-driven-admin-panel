import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlatformUser',
        required: true
    },
    plan: {
        type: String,
        enum: ['monthly', 'yearly'], 
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    amountPaid: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Subscription', subscriptionSchema);
