export const maxLength =
  (length: number) =>
  (value = "") => {
    return value.slice(0, length)
  }

export const numbers = (value = "") => {
  return value.replace(/\D/g, "")
}

export const numbersAndCommaAndDot = (value = "") => {
  return value.replace(/[^0-9\,\ \.]/g, "").replace(/,/g, ".")
}

export const twoDecimals = (value = "") => {
  value = value.replace(/[a-zA-Z]/g, "")
  value = value.replace(/[^0-9\,\ \.]/g, "")
  const match = value.match(/\d+(\.|\,)?\d{0,2}/)
  return match ? match[0] : ""
}

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

export type maxLengthFormatterName = `maxLength:${number}`

export type Formatter =
  | maxLengthFormatterName
  | "numbers"
  | "numbersAndCommaAndDot"
  | "twoDecimals"
  | "threeDecimals"
