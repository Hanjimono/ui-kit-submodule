/**
 * Creates a formatter function that truncates a string to a specified maximum length.
 *
 * @param length - The maximum length of the string.
 * @returns A function that takes a string and returns it truncated to the specified length.
 */
export const maxLength =
  (length: number) =>
  (value = "") => {
    return value.slice(0, length)
  }

/**
 * Formatter function that removes all non-digit characters from a given string.
 *
 * @param {string} [value=""] - The input string to be formatted. Defaults to an empty string if not provided.
 * @returns {string} - The formatted string containing only numeric characters.
 */
export const numbers = (value = "") => {
  return value.replace(/\D/g, "")
}

/**
 * Formats a given string to only include numbers, commas, spaces, and dots.
 * Replaces all commas with dots.
 *
 * @param value - The string to be formatted. Defaults to an empty string.
 * @returns The formatted string containing only numbers, spaces, and dots.
 */
export const numbersAndCommaAndDot = (value = "") => {
  return value.replace(/[^0-9\,\ \.]/g, "").replace(/,/g, ".")
}

/**
 * Formats a given string to ensure it contains only numeric characters and up to two decimal places.
 *
 * This function removes any alphabetic characters and any other non-numeric characters except for
 * commas, periods, and spaces. It then matches the first occurrence of a number with up to two decimal places.
 *
 * @param value - The input string to be formatted. Defaults to an empty string.
 * @returns A string representing the formatted number with up to two decimal places, or an empty string if no match is found.
 */
export const twoDecimals = (value = "") => {
  value = value.replace(/[a-zA-Z]/g, "")
  value = value.replace(/[^0-9\,\ \.]/g, "")
  const match = value.match(/\d+(\.|\,)?\d{0,2}/)
  return match ? match[0] : ""
}

/**
 * Formats a given string to ensure it contains only numeric values and up to three decimal places.
 *
 * This function removes any alphabetic characters and any non-numeric characters except for commas, spaces, and periods.
 * It then matches the first sequence of digits, optionally followed by a comma or period, and up to three decimal places.
 *
 * @param value - The input string to be formatted. Defaults to an empty string if not provided.
 * @returns The formatted string containing only numeric values and up to three decimal places, or an empty string if no match is found.
 */
export const threeDecimals = (value = "") => {
  value = value.replace(/[a-zA-Z]/g, "")
  value = value.replace(/[^0-9\,\ \.]/g, "")
  const match = value.match(/\d+(\.|\,)?\d{0,3}/)
  return match ? match[0] : ""
}

/**
 * Formats the input value based on the specified formatter name.
 *
 * @param formatterName - The name of the formatter to apply.
 * @param value - The input value to be formatted.
 * @returns The formatted value based on the specified formatter.
 */
export const inputFormat = (formatterName: Formatter, value: string) => {
  switch (formatterName) {
    case "numbers":
      return numbers(value)
    case "numbersAndCommaAndDot":
      return numbersAndCommaAndDot(value)
    case "twoDecimals":
      return twoDecimals(value)
    case "threeDecimals":
      return threeDecimals(value)
    default:
      if (formatterName.startsWith("maxLength:")) {
        const length = formatterName.split(":")[1]
        return maxLength(parseInt(length))(value)
      }
      return value
  }
}

/**
 * A type representing a formatter name for maximum length validation.
 * The format is `maxLength:<number>`, where `<number>` is a placeholder for the maximum length value.
 */
export type maxLengthFormatterName = `maxLength:${number}`

/**
 * A type representing various input formatters.
 *
 * The `Formatter` type can be one of the following:
 * - `maxLengthFormatterName`: A formatter for maximum length.
 * - `"numbers"`: A formatter that allows only numbers.
 * - `"numbersAndCommaAndDot"`: A formatter that allows numbers, commas, and dots.
 * - `"twoDecimals"`: A formatter that allows numbers with up to two decimal places.
 * - `"threeDecimals"`: A formatter that allows numbers with up to three decimal places.
 */
export type Formatter =
  | maxLengthFormatterName
  | "numbers"
  | "numbersAndCommaAndDot"
  | "twoDecimals"
  | "threeDecimals"
