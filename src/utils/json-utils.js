/**
 * Converts a JSON string to object
 * @param jsonString
 * @param source
 */
export const jsonStringToObject = (jsonString, source = {} ) => {
  const s = jsonString.replace(/'/g, '"');
  try {
    return Object.assign(source, JSON.parse(s));
  }
  catch (e) {
    throw new Error(`Failed to parse data-config: ${s}. Error: ${e.message}`);
  }
};
