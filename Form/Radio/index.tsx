// System
import { cx } from "class-variance-authority"
import { FieldValues } from "react-hook-form"
import { twMerge } from "tailwind-merge"
// Ui
import Pillar from "@/ui/Layout/Pillar"
import FormField from "@/ui/Form/Field"
import Beam from "@/ui/Layout/Beam"
// Logic
import { useFormattedError, useFormattedValue } from "@/ui/Form/Hooks"
// Styles and types
import { DefaultRadioOption, RadioItemProps, RadioProps } from "./types"

/**
 * A functional component that renders a group of radio buttons within a form field.
 *
 * @template RadioOptionType - The type of the radio option.
 * @template FormValues - The type of the form values.
 *
 * @param {RadioProps<RadioOptionType, FormValues>} props - The properties for the Radio component.
 * @param {string} [props.className] - Additional class names to apply to the radio group container.
 * @param {FormState<FormValues>} [props.formState] - The RHC state of the form, used to retrieve error messages.
 * @param {string} props.name - The name of the radio group, used for form handling.
 * @param {string} [props.error] - An error message to display for the radio group.
 * @param {string | number} props.value - The current value of the selected radio button.
 * @param {RadioOptionType[]} props.options - The options to display as radio buttons.
 * @param {boolean} [props.disabled] - Whether the radio buttons are disabled.
 * @param {function} props.onChange - The function to call when the selected radio button changes.
 * @param {Field} props.field - The RHC field object for the radio group.
 * @param {string} [props.type="columns"] - The layout type of the radio buttons, either "columns" or another type.
 * @param {object} [props.rest] - Additional properties to pass to the FormField component.
 *
 * @returns {JSX.Element} The rendered radio group component.
 */
export function Radio<
  RadioOptionType extends DefaultRadioOption,
  FormValues extends FieldValues
>({
  className,
  formState,
  name,
  error,
  value,
  options,
  disabled,
  onChange,
  field,
  type = "columns",
  ...rest
}: RadioProps<RadioOptionType, FormValues>) {
  const formattedError = useFormattedError(name, formState, error)
  const calculatedClassNames = twMerge(
    cx("radio-group", type == "rows" && "flex-col", className)
  )
  return (
    <FormField error={formattedError} {...rest}>
      <Beam className={calculatedClassNames}>
        {options &&
          options.length > 0 &&
          options.map((item, index) => {
            return (
              <RadioItem
                key={index}
                item={item}
                name={name}
                value={value}
                disabled={disabled}
                field={field}
                onChange={onChange}
              />
            )
          })}
      </Beam>
    </FormField>
  )
}

/**
 * A functional component that renders a radio item within a form.
 *
 * @template RadioOptionType - The type of the radio option.
 * @template FormValues - The type of the form values.
 *
 * @param {RadioItemProps<RadioOptionType, FormValues>} props - The properties passed to the component.
 * @param {string} [props.className] - Additional class names to apply to the radio item container.
 * @param {RadioOptionType} props.item - The radio option item to be rendered.
 * @param {FieldValues} [props.field] - The RHC field values associated with the radio item.
 * @param {string} props.name - The name of the radio item.
 * @param {any} [props.value] - The value of the radio item.
 * @param {boolean} [props.disabled] - Whether the radio item is disabled.
 * @param {function} [props.onChange] - The callback function to handle changes to the radio item.
 * @param {object} [props.rest] - Additional properties to be passed to the Pillar component.
 *
 * @returns {JSX.Element} The rendered radio item component.
 */
export function RadioItem<
  RadioOptionType extends DefaultRadioOption,
  FormValues extends FieldValues
>({
  className,
  item,
  field,
  name,
  value,
  disabled,
  onChange,
  ...rest
}: RadioItemProps<RadioOptionType, FormValues>) {
  const formattedValue = useFormattedValue(field, value)
  const handleRadioChange = () => {
    if (formattedValue === item.value || disabled) {
      return
    }
    if (onChange) {
      onChange(name, item.value)
    }
  }
  const calculatedClassNames = twMerge(
    cx(
      "radio-item flex items-center w-full cursor-pointer",
      disabled && "cursor-default",
      className
    )
  )
  return (
    <Pillar {...rest}>
      <div className={calculatedClassNames} onClick={handleRadioChange}>
        <div
          className={
            "w-5 h-5 flex items-center justify-center rounded-full border border-gray-500"
          }
        >
          <div
            className={twMerge(
              cx(
                "transition-opacity min-w-3 min-h-3 max-w-3 max-h-3 bg-primary-main rounded-full opacity-1",
                formattedValue !== item.value && "opacity-0",
                disabled && "bg-gray-500"
              )
            )}
          ></div>
        </div>
        <div className={"ml-2"}>{item.title}</div>
      </div>
    </Pillar>
  )
}
export default Radio
