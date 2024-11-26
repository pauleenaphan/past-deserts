export const getFormattedDate = (): string => {
    const today = new Date();
    
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();

    // Return the formatted date in mm/dd/yyyy format
    return `${month}/${day}/${year}`;
};