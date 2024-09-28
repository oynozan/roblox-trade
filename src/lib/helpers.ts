// Date to DD/MM/YYYY Format
export function formatDate(date: Date): string {
    // Extract day, month, and year from the date object
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    // Return formatted date string
    return `${day}/${month}/${year}`;
}

export function DDMMMMYYYY(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
}

// Returns color based on given string
export function stringToColor(str: string): string {
    let hash = 0;
    str.split("").forEach(char => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += value.toString(16).padStart(2, "0");
    }

    return colour;
}

// A timeout function
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    const timeout = new Promise<never>((_, reject) => {
        const id = setTimeout(() => {
            clearTimeout(id);
            reject(new Error("Request timed out"));
        }, ms);
    });

    return Promise.race([promise, timeout]);
}
