// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import { FieldValues } from "react-hook-form"
// Ui
import FormField from "@/ui/Form/Field"
import { useFormattedError, useFormattedValue } from "@/ui/Form/Hooks"
// Styles and types
import { SwitchProps } from "./types"

/**
 * A customizable switch component for forms.
 *
 * @template FormValues - The type of the form values.
 * @param {SwitchProps<FormValues>} props - The properties for the Switch component.
 * @param {string} [props.className] - Additional class names for the switch container.
 * @param {string} [props.switchOnText="ON"] - Text to display when the switch is on.
 * @param {string} [props.switchOffText="OFF"] - Text to display when the switch is off.
 * @param {boolean} [props.checked] - Indicates whether the switch is checked.
 * @param {string} [props.error] - Error message to display.
 * @param {FieldValues} [props.field] - Field values from the form.
 * @param {FormState} [props.formState] - The state of the form.
 * @param {string} [props.name] - The name of the switch field.
 * @param {string} [props.label] - Label to display next to the switch.
 * @param {string} [props.leftLabel] - Label to display on the left side of the switch.
 * @param {boolean} [props.disabled] - Indicates whether the switch is disabled.
 * @param {function} [props.onChange] - Callback function to handle switch state changes.
 * @param {boolean} [props.withoutText] - Indicates whether to display text on the switch.
 * @param {object} [props.rest] - Additional properties to pass to the FormField component.
 * @returns {JSX.Element} The rendered switch component.
 */
function Switch<FormValues extends FieldValues>({
  className,
  switchOnText = "ON",
  switchOffText = "OFF",
  checked,
  error,
  field,
  formState,
  name,
  label,
  leftLabel,
  disabled,
  onChange,
  withoutText,
  ...rest
}: SwitchProps<FormValues>) {
  const formattedValue = useFormattedValue(field, checked) || false
  const formattedError = useFormattedError(name, formState, error)
  const calculatedClassNames = twMerge(
    cx(
      "switch flex items-center cursor-pointer w-full",
      disabled && "cursor-default",
      className
    )
  )
  const handleSwitchChange = () => {
    if (disabled) {
      return
    }
    if (onChange) {
      onChange(name, formattedValue === false ? true : false)
    }
  }
  return (
    <FormField error={formattedError} {...rest}>
      <div className={calculatedClassNames} onClick={handleSwitchChange}>
        {leftLabel && <div className="mr-2">{leftLabel}</div>}
        <div
          className={twMerge(
            cx(
              "flex items-center bg-form h-10 w-20 rounded-md relative p-2",
              formattedValue && "bg-primary-main",
              withoutText && "w-16"
            )
          )}
        >
          {!withoutText && (
            <span
              className={twMerge(
                cx(
                  "transition-opacity opacity-1 flex-1 text-left",
                  disabled && "opacity-50",
                  formattedValue === true && "opacity-0"
                )
              )}
            >
              {switchOffText}
            </span>
          )}
          <div
            className={twMerge(
              cx(
                "transition-all min-w-6 min-h-6 max-w-6 max-h-6 absolute left-2 bg-white rounded-full",
                formattedValue === false && "left-12 bg-gray-500",
                formattedValue === false && withoutText && "left-8",
                disabled && "bg-gray-600"
              )
            )}
          />
          {!withoutText && (
            <span
              className={twMerge(
                cx(
                  "transition-opacity opacity-1 flex-1 text-right",
                  disabled && "opacity-50",
                  formattedValue === false && "opacity-0"
                )
              )}
            >
              {switchOnText}
            </span>
          )}
        </div>
        {label && <div className="ml-2">{label}</div>}
      </div>
    </FormField>
  )
}
export default Switch
