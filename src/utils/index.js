import crypto from "crypto";

export const generateWidgetToken = (widgetId, widgetSecret) => {
    return crypto.createHmac("sha256", widgetSecret).update(widgetId).digest("hex");
};

export function getDomainName(url) {
    try {
        const hostname = new URL(url).hostname;
        return hostname.replace(/^www\./, ""); // Remove 'www.' if present
    } catch (error) {
        console.error("Invalid URL:", error);
        return null;
    }
}