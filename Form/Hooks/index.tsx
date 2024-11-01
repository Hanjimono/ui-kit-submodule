import { useMemo } from "react"
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormStateReturn
} from "react-hook-form"

/**
 * Custom hook to get a formatted value from a field or a provided value.
 *
 * @template FormValues - The type of the form values.
 * @param {ControllerRenderProps<FormValues>} [field] - The RHC field from which to get the value.
 * @param {string | number | string[] | number[] | boolean} [value] - The value to be formatted.
 * @returns {string | number | string[] | number[] | boolean} - The formatted value.
 */
export function useFormattedValue<FormValues extends FieldValues>(
  field?: ControllerRenderProps<FormValues>,
  value?: string | number | string[] | number[] | boolean
) {
  return useMemo(() => {
    return value || (field && field.value)
  }, [value, field])
}

/**
 * Custom hook to format and retrieve error messages for form fields.
 *
 * @template FormValues - The type of form values.
 * @param {Path<FormValues>} name - The name of the form field.
 * @param {UseFormStateReturn<FormValues>} [formState] - The RHC state of the form, including errors.
 * @param {string} [error] - An optional error message to override the form state error.
 * @returns {string | undefined} - The formatted error message, or undefined if no error exists.
 */
export function useFormattedError<FormValues extends FieldValues>(
  name: Path<FormValues>,
  formState?: UseFormStateReturn<FormValues>,
  error?: string
) {
  return useMemo(() => {
    return (
      error ||
      formState?.errors?.[name]?.message?.toString()
    )
  }, [error, formState, name])
}
