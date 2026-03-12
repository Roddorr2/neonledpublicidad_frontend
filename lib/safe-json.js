export function safeJsonParse(value, fallback = null) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Invalid JSON value received, using fallback.", error);
    }
    return fallback;
  }
}
