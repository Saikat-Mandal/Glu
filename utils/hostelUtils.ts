const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatToUTCBookingReview = (dateParam: string | string[] | undefined) => {
    const dateStr = Array.isArray(dateParam) ? dateParam[0] : dateParam;

    if (!dateStr) return '-';

    const day = dateStr.slice(8);
    const month = parseInt(dateStr.slice(5, 7), 10);
    const year = dateStr.slice(0, 4);

    return `${day} ${monthArray[month - 1]} ${year}`;
};
