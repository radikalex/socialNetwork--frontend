export const getTimeElapsed = (date) => {
    const actualDate = new Date();
    const postDate = new Date(date);
    const timeElapsed = (actualDate.getTime() - postDate.getTime()) / 1000;

    switch (true) {
        case timeElapsed < 1:
            return `A moment ago`;
        case timeElapsed < 60: // Seconds
            return `${Math.floor(timeElapsed)} ${
                Math.floor(timeElapsed) === 1 ? "second" : "seconds"
            } ago`;
        case timeElapsed < 3600: // Minutes
            return `${Math.floor(timeElapsed / 60)} ${
                Math.floor(timeElapsed / 60) === 1 ? "minute" : "minutes"
            } ago`;
        case timeElapsed < 86400: // Hours
            return `${Math.floor(timeElapsed / 3600)} ${
                Math.floor(timeElapsed / 3600) === 1 ? "hour" : "hours"
            } ago`;
        case timeElapsed < 604800: // Days
            return `${Math.floor(timeElapsed / 86400)} ${
                Math.floor(timeElapsed / 86400) === 1 ? "day" : "days"
            } ago`;
        case timeElapsed < 1814400: // Week
            return `${Math.floor(timeElapsed / 604800)} ${
                Math.floor(timeElapsed / 604800) === 1 ? "week" : "weeks"
            } ago`;
        case timeElapsed < 31536000: // Months
            return `${postDate.getDate()} ${postDate
                .toLocaleString("en-US", { month: "short" })
                .toLowerCase()}.`;
        case timeElapsed >= 31536000: // Years
            return `${postDate.getDate()} ${postDate
                .toLocaleString("en-US", { month: "short" })
                .toLowerCase()}. ${postDate.getFullYear()}`;
        default:
            break;
    }

    return "";
};
