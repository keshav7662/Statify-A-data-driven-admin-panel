export const nonEmptyStringValidator = (fields) => {
    return fields.some(field => !field || field.trim().length === 0);
};
