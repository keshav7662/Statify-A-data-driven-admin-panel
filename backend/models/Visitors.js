import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            default: 'visitor_count',
            unique: true,
        },
        liveCount: { type: Number, default: 0 },
        growth: {
            previousWeekCount: { type: Number, default: 0 },
            growthValue: { type: Number, default: 0 },
            growthPercentage: { type: Number, default: 0 },
            lastUpdated: { type: Date, default: Date.now() }
        }
    },
    { timestamps: true }
);

export default mongoose.model('Visitor', visitorSchema);
