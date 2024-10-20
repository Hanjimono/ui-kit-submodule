// System
import clsx from "clsx"
// Ui
import Pillar from "@/ui/Layout/Pillar"
import FormField from "@/ui/Form/Field"
import Beam from "@/ui/Layout/Beam"
// Styles and types
import { DefaultRadioOption, RadioItemProps, RadioProps } from "./types"
import styles from "./styles.module.scss"
import { FieldValues } from "react-hook-form"

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
  const formattedError =
    error ||
    (formState &&
      formState.errors[name] &&
      formState.errors[name].message &&
      formState.errors[name].message?.toString())
  const calculatedClassNames = clsx(
    styles["radio-group-container"],
    className,
    styles[type]
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
  const formattedValue = value || (field && field.value)
  const handleRadioChange = () => {
    if (formattedValue === item.value || disabled) {
      return
    }
    if (onChange) {
      onChange(name, item.value)
    }
  }
  const calculatedClassNames = clsx(
    styles["radio-item-container"],
    className,
    formattedValue === item.value && styles["checked"],
    disabled && styles["disabled"]
  )
  return (
    <Pillar {...rest}>
      <div className={calculatedClassNames} onClick={handleRadioChange}>
        <div className={styles["radio-icon-container"]}>
          <div className={styles["radio-icon"]}></div>
        </div>
        <div className={styles["radio-label"]}>{item.title}</div>
      </div>
    </Pillar>
  )
}
export default Radio
