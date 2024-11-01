// System
import clsx from "clsx"
import { FieldValues } from "react-hook-form"
// Ui
import FormField from "@/ui/Form/Field"
import { useFormattedError, useFormattedValue } from "@/ui/Form/Hooks"
// Styles and types
import { SwitchProps } from "./types"
import styles from "./styles.module.scss"

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
  const calculatedClassNames = clsx(
    styles["switch-container"],
    className,
    formattedValue && styles["checked"],
    disabled && styles["disabled"],
    formattedError && styles["error"],
    withoutText && styles["without-text"]
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
        {leftLabel && (
          <div className={clsx(styles["switch-label"], styles["left"])}>
            {leftLabel}
          </div>
        )}
        <div className={styles["switch-content-container"]}>
          {!withoutText && (
            <span className={clsx(styles["switch-text"], styles["off"])}>
              {switchOffText}
            </span>
          )}
          <div className={styles["switch"]} />
          {!withoutText && (
            <span className={clsx(styles["switch-text"], styles["on"])}>
              {switchOnText}
            </span>
          )}
        </div>
        {label && <div className={styles["switch-label"]}>{label}</div>}
      </div>
    </FormField>
  )
}
export default Switch
