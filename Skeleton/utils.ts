import { cx } from "class-variance-authority"
import { ClassValue } from "class-variance-authority/types"
import { extendTailwindMerge } from "tailwind-merge"

//TODO: Sadly there are no other way to merge custom classes without specifying all possible variants
// in the configuration. Maybe I should search for a more dynamic solution.
/**
 * Extends the default Tailwind Merge configuration with custom class groups
 * for spacing, sizing, and rounding utilities specific to the UI boilerplate.
 *
 * @see {@link https://github.com/dcastil/tailwind-merge | tailwind-merge}
 */
export const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      gap: [
        "gap-tight",
        "gap-close",
        "gap-same-level-close",
        "gap-same-level",
        "gap-distant",
        "gap-extra-distant"
      ],
      h: ["h-button", "h-button-small", "h-form-element", "h-input-fieldset"],
      rounded: ["rounded-button", "rounded-form-element"],
      p: [
        "p-step-tiny",
        "p-step-xs",
        "p-step-2xs",
        "p-step-3xs",
        "p-step-sm",
        "p-step-2sm",
        "p-step-md",
        "p-step-lg",
        "p-step-2lg",
        "p-step-xl",
        "p-step-2xl",
        "p-step-3xl",
        "p-step-4xl",
        "p-button",
        "p-button-small",
        "p-card",
        "p-card-small",
        "p-panel",
        "p-panel-small",
        "p-panel-tiny",
        "p-action",
        "p-action-small",
        "p-form-element"
      ],
      px: [
        "px-step-tiny",
        "px-step-xs",
        "px-step-2xs",
        "px-step-3xs",
        "px-step-sm",
        "px-step-2sm",
        "px-step-md",
        "px-step-lg",
        "px-step-2lg",
        "px-step-xl",
        "px-step-2xl",
        "px-step-3xl",
        "px-step-4xl"
      ],
      py: [
        "py-step-tiny",
        "py-step-xs",
        "py-step-2xs",
        "py-step-3xs",
        "py-step-sm",
        "py-step-2sm",
        "py-step-md",
        "py-step-lg",
        "py-step-2lg",
        "py-step-xl",
        "py-step-2xl",
        "py-step-3xl",
        "py-step-4xl"
      ],
      m: [
        "m-tight",
        "m-close",
        "m-same-level-close",
        "m-same-level",
        "m-distant",
        "m-extra-distant"
      ],
      mx: [
        "mx-tight",
        "mx-close",
        "mx-same-level-close",
        "mx-same-level",
        "mx-distant",
        "mx-extra-distant"
      ],
      my: [
        "my-tight",
        "my-close",
        "my-same-level-close",
        "my-same-level",
        "my-distant",
        "my-extra-distant"
      ]
    }
  }
})

/**
 * Formats and merges class names using custom Tailwind merge logic.
 *
 * @param rules - base class rules values to be merged. Use most important rules as the last arguments.
 * @returns A single string containing the merged class names.
 */
export const formatClassnames = (...rules: ClassValue[]) => {
  return customTwMerge(cx(...rules))
}

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
    return customTwMerge(cx(cvaFunction(), ...inputs))
  }
  const formattedVariants: { [key: string]: any } = { ...variants }
  Object.keys(formattedVariants).forEach((key) => {
    if (typeof formattedVariants[key] === "boolean") {
      formattedVariants[key] = formattedVariants[key] ? "default" : "unset"
    }
  })
  return customTwMerge(cx(cvaFunction(formattedVariants), ...inputs))
}
