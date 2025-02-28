import mongoose from 'mongoose';

const growthMetricsSchema = new mongoose.Schema({
    metricType: { type: String, enum: ['PlatformUser', 'Visitors', 'Revenue'], required: true },
    previousCount: { type: Number, default: 0 },
    currentCount: { type: Number, default: 0 },
    growthValue: { type: Number, default: 0 },
    growthPercentage: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
});

growthMetricsSchema.index({ metricType: 1 });

export default mongoose.model('GrowthMetrics', growthMetricsSchema);
