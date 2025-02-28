export const formatIndianRupee = (number) => {
    const absNumber = Math.abs(number); // Handle negative numbers
    let formattedNumber = '';
    let unit = '';

    if (absNumber >= 1e7) {
        // Crores
        formattedNumber = (number / 1e7).toFixed(2);
        unit = 'Cr.';
    } else if (absNumber >= 1e5) {
        // Lakhs
        formattedNumber = (number / 1e5).toFixed(2);
        unit = 'L';
    } else if (absNumber >= 1e3) {
        // Thousands
        formattedNumber = (number / 1e3).toFixed(2);
        unit = 'K';
    } else {
        // Less than 1000
        formattedNumber = number.toFixed(2);
    }

    return `${parseFloat(formattedNumber)}${unit}`;
};


