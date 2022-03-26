export const germanDateStringToDate = string => {
    let [ day, month, year ] = string.split('.');
    month = parseInt(month) - 1;
    return new Date(year, month, day);
};
