export const isWeekPassed = async (previousDate, currentDate) => {
    try {
        const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        return (new Date(currentDate) - new Date(previousDate)) >= oneWeekInMs;
    } catch (error) {
        console.error('Error calculating time difference:', error);
        throw new Error('Error in checking if a week has passed');
    }
};
