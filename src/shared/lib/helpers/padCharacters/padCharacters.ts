type PadDirection = "left" | "right";

export default function padCharacters(
    value: string,
    length: number,
    options?: {
        padChar?: string;
        direction?: PadDirection;
    }
): string {
    // Set default options
    const { padChar = "0", direction = "left" } = options || {};

    if (value.length >= length) {
        // Return the original value if it's already of the desired length or longer
        return value;
    }

    // Calculate how many characters we need to pad
    const padLength = length - value.length;
    const padding = padChar.repeat(padLength);

    // Add padding to the specified side
    if (direction === "left") {
        return padding + value;
    } else {
        return value + padding;
    }
}
