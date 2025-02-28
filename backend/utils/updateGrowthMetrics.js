import GrowthMetrics from '../models/GrowthMetrics.js';
import { calculatePercentageChange } from './percentageChange.js';
import { isWeekPassed } from '../utils/isWeekPassed.js'
export const updateGrowthMetrics = async (metricType, currentCount) => {
    const growthData = await GrowthMetrics.findOne({ metricType });

    if (!growthData) {
        const newGrowthData = new GrowthMetrics({
            metricType,
            previousCount: 0,
            currentCount,
            growthValue: 0,
            growthPercentage: 0,
            lastUpdated: Date.now(),
        });
        return newGrowthData.save();
    }

    const currentTime = Date.now();
    if (await isWeekPassed(growthData.lastUpdated, currentTime)) {
        const growthValue = currentCount - growthData.previousCount;
        let growthPercentage = calculatePercentageChange(currentCount, growthData.previousCount);
        growthPercentage = parseFloat(growthPercentage.toFixed(2));
        // Update growth metrics
        growthData.previousCount = growthData.currentCount;
        growthData.currentCount = currentCount;
        growthData.growthValue = growthValue;
        growthData.growthPercentage = growthPercentage;
        growthData.lastUpdated = currentTime;

        return growthData.save();
    }

    return growthData;
};


