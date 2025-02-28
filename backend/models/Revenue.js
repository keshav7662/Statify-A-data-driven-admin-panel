import mongoose from 'mongoose';

const revenueSchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true },
    revenue: { type: Number, default: 0 },
    source: { type: String },
    growth: {
        previousWeekCount: { type: Number, default: 0 },
        growthValue: { type: Number, default: 0 },
        growthPercentage: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: Date.now() }
    }
});

export default mongoose.model('Revenue', revenueSchema);
