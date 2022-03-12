const maxItemsPerPage = 15;

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
] as const;

type Month = typeof months[number];

export { maxItemsPerPage, months, Month };
