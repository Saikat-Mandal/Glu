const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatToUTCBookingReview = (dateParam: string | string[] | undefined) => {
    const dateStr = Array.isArray(dateParam) ? dateParam[0] : dateParam;

    if (!dateStr) return '-';

    const day = dateStr.slice(8);
    const month = parseInt(dateStr.slice(5, 7), 10);
    const year = dateStr.slice(0, 4);

    return `${day} ${monthArray[month - 1]} ${year}`;
};


export const getTotalNights = (param: string | string[] | undefined): number => {
    if (!param) return 1; // Default to 1 night if undefined

    const value = Array.isArray(param) ? param[0] : param;

    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 1 : parsed;
};




export const getNumberOfGuests = (rooms) => {
    let totalGuests = 0;

    rooms.forEach(room => {
        const beds = room.beds; // user selected beds

        // Room IDs 2, 4, 1, 3 → 1 guest per bed
        if ([2, 4, 1, 3].includes(room.id)) {
            totalGuests += beds;
        }

        // Room IDs 5, 6 → each room is for 2 guests
        if ([5, 6].includes(room.id)) {
            totalGuests += beds * 2; // beds here means number of rooms
        }
    });

    return totalGuests;
};
