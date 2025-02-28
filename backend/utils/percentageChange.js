export const calculatePercentageChange = (currentValue, previousValue) => {
    if (previousValue === 0) return currentValue > 0 ? 100 : 0; 
    return ((currentValue - previousValue) / previousValue) * 100;
};