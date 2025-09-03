// System
import { FieldValues } from "react-hook-form"
// Logic
import { useFormattedError, useFormattedValue } from "@/ui/Form/Hooks"
// Ui
import { formatClassnames } from "@/ui/Skeleton/utils"
import FormField from "@/ui/Form/Field"
import Icon from "@/ui/Presentation/Icon"
// Styles and types
import { CheckboxProps } from "./types"

/**
 * Checkbox component for forms.
 * Can be used with form libraries like react-hook-form or standalone.
 *
 * @template FormValues - The type of form values.
 * @param {CheckboxProps<FormValues>} props - The properties for the Checkbox component.
 * @param {string} props.label - The label for the checkbox.
 * @param {string} props.className - Additional class names for styling.
 * @param {string} props.error - Error message to display.
 * @param {string} props.name - The name of the checkbox field.
 * @param {boolean} props.checked - The checked state of the checkbox.
 * @param {object} props.field - Field object containing value and other properties.
 * @param {object} props.formState - Form state object containing errors and other properties.
 * @param {function} props.onChange - Callback function to handle change events.
 * @param {boolean} props.disabled - Whether the checkbox is disabled.
 * @param {object} props.rest - Additional properties to pass to the FormField component.
 * @returns {JSX.Element} The rendered Checkbox component.
 */
function Checkbox<FormValues extends FieldValues>({
  label,
  className,
  error,
  name,
  checked,
  field,
  formState,
  onChange,
  disabled,
  ...rest
}: CheckboxProps<FormValues>) {
  const formattedValue = useFormattedValue(field, checked)
  const formattedError = useFormattedError(name, formState, error)
  const calculatedClassNames = formatClassnames(
    "checkbox flex w-full items-center cursor-pointer transition-colors",
    !!disabled && "cursor-default",
    className
  )
  const handleCheckboxChange = () => {
    if (disabled) {
      return
    }
    if (onChange) {
      onChange(name, formattedValue === "partial" ? false : !formattedValue)
    }
  }
  return (
    <FormField error={formattedError} {...rest}>
      <div className={calculatedClassNames} onClick={handleCheckboxChange}>
        <div
          className={formatClassnames(
            "w-5 h-5 border border-form-border rounded-xs flex items-center justify-center",
            !!error && "border-remove-main"
          )}
        >
          <Icon
            className={formatClassnames(
              "text-primary-main transition-opacity",
              formattedValue !== true && "opacity-0",
              !!disabled && "text-gray-500"
            )}
            type="md"
            name="check"
          />
          {formattedValue == "partial" && (
            <div
              className={formatClassnames(
                "absolute top-1 left-1 min-w-3 min-h-3 max-w-3 max-h-3 bg-primary-main rounded-xs",
                !!disabled && "bg-gray-500"
              )}
            ></div>
          )}
        </div>
        {label && <div className={"ml-2"}>{label}</div>}
        <input className="hidden" type="checkbox" name={name} />
      </div>
    </FormField>
  )
}

export default Checkbox
