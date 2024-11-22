import { cx } from "class-variance-authority"
import { ClassValue } from "class-variance-authority/types"
import { twMerge } from "tailwind-merge"

/**
 * A wrapper function for a CVA (Class Variants Adapter) function that formats boolean variant values
 * and combines the result with additional class values.
 *
 * @param cvaFunction - A function that takes an optional variants object and returns a string of class names.
 * @param variants - An optional object containing variant key-value pairs. Boolean values are formatted to "default" or "unset".
 * @param inputs - Additional class values to be combined with the result of the CVA function.
 * @returns A string of combined class names.
 */
export const smartCvaWrapper = (
  cvaFunction: (variants?: Object) => string,
  variants?: Object,
  ...inputs: ClassValue[]
) => {
  if (!variants) {
    return twMerge(cx(cvaFunction(), ...inputs))
  }
  const formattedVariants: { [key: string]: any } = { ...variants }
  Object.keys(formattedVariants).forEach((key) => {
    if (typeof formattedVariants[key] === "boolean") {
      formattedVariants[key] = formattedVariants[key] ? "default" : "unset"
    }
  })
  return twMerge(cx(cvaFunction(formattedVariants), ...inputs))
}
