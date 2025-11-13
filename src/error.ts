export const TYPE_PROP_ERROR =
  "The 'type' property is intentionally unavailable at runtime. It is provided for TypeScript type checking purposes only (e.g., typeof enum[type]).\nTo determine if a value exists in your enum, use the [values] or [keys] properties instead. For example: 'if (MyEnum[values].includes(value)) { ... }'.";

export const ERR_INVALID_ARRAY_OR_OBJECT =
  "Invalid enum definition: expected an array of strings or a plain object with string keys and string or number values. Received a value that is not a valid array or object.";

export const ERR_INVALID_OBJECT =
  "Invalid enum definition: expected a plain object with string keys and string or number values. Received an object with keys that are not strings or values that are not strings or numbers.";

export const ERR_INVALID_STRING_ARRAY =
  "Invalid enum definition: expected an array of strings. Received an array with values that are not strings.";
