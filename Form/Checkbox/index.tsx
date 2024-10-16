// System
import clsx from "clsx"
import { FieldValues } from "react-hook-form"
// Ui
import FormField from "@/ui/Form/Field"
import Icon from "@/ui/Presentation/Icon"
// Styles and types
import { CheckboxProps } from "./types"
import styles from "./styles.module.scss"

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
  const formattedValue = checked || (field && field.value) || false
  const formattedError =
    error ||
    (formState &&
      formState.errors[name] &&
      formState.errors[name].message &&
      formState.errors[name].message?.toString())
  const calculatedClassNames = clsx(
    styles["checkbox-container"],
    className,
    formattedValue === "partial" && styles["partial"],
    disabled && styles["disabled"],
    formattedError && styles["error"]
  )
  const handleCheckboxChange = () => {
    if (disabled) {
      return
    }
    if (onChange) {
      onChange(name, formattedValue === false ? true : false)
    }
  }
  return (
    <FormField error={formattedError} {...rest}>
      <div className={calculatedClassNames} onClick={handleCheckboxChange}>
        <div className={styles["checkbox-icon-container"]}>
          {formattedValue === true && (
            <Icon className={styles["checkbox-icon"]} type="md" name="check" />
          )}
          {formattedValue === "partial" && (
            <div className={styles["checkbox-partial-icon"]}></div>
          )}
        </div>
        {label && <div className={styles["checkbox-label"]}>{label}</div>}
        <input type="checkbox" name={name} />
      </div>
    </FormField>
  )
}
export default Checkbox
