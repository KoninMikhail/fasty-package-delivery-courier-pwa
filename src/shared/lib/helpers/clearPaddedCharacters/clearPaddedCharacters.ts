type ClearPadDirection = "left" | "right";

export default function clearPaddedCharacters(
    value: string,
    options?: {
        padChar?: string;
        direction?: ClearPadDirection;
    }
): string {
    // Set default options
    const { padChar = "0", direction = "left" } = options || {};

    if (direction === "left") {
        // Use a regular expression to remove padding characters from the start
        const regex = new RegExp(`^${padChar}+`);
        return value.replace(regex, '');
    } else {
        // Use a regular expression to remove padding characters from the end
        const regex = new RegExp(`${padChar}+$`);
        return value.replace(regex, '');
    }
}