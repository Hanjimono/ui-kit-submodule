"use client"
// System
import clsx from "clsx"
import { FieldValues } from "react-hook-form"
// Ui
import FormField from "../Field"
import Button from "@/ui/Actions/Button"
import Icon from "@/ui/Presentation/Icon"
import Loader from "@/ui/Presentation/Loader"
import Text from "@/ui/Presentation/Text"
// Logic
import { inputFormat } from "./formatters"
// Styles and types
import { InputProps } from "./types"
import styles from "./styles.module.scss"

/**
 * A versatile Input component for forms, supporting various features such as icons, error handling, and formatting.
 * Can be used with react-hook-form or standalone.
 *
 * @template FormValues - The type of the form values.
 * @param {InputProps<FormValues>} props - The properties for the Input component.
 * @param {string} [props.className] - Additional class names for styling.
 * @param {string} [props.label] - The label for the input field.
 * @param {string} props.name - The name of the input field.
 * @param {string} [props.value] - The value of the input field. Not required when using react-hook-form.
 * @param {(name: string, value: string | undefined) => void} [props.onChange] - The function to call when the input value changes.
 * @param {boolean} [props.clearable] - Whether the input field is clearable.
 * @param {(name: string) => void} [props.onClear] - The function to call when the clear button is clicked.
 * @param {string} [props.icon] - The icon to display at the start of the input field.
 * @param {string} [props.endIcon] - The icon to display at the end of the input field.
 * @param {number} [props.iconSize=24] - The size of the icon.
 * @param {number} [props.iconHeight=24] - The height of the icon.
 * @param {string} [props.iconType="md"] - The type of the icon.
 * @param {boolean} [props.loading] - Whether the input field is in a loading state.
 * @param {string | boolean} [props.error] - The error message or state for the input field.
 * @param {boolean} [props.filled] - Whether the input field is filled.
 * @param {boolean} [props.labelOnTop] - Whether the label should be displayed on top of the input field.
 * @param {boolean} [props.noAnimation] - Whether to disable animations of label.
 * @param {string | string[]} [props.formatter] - The formatter(s) to apply to the input value.
 * @param {FieldValues} [props.field] - The field object from react-hook-form.
 * @param {FormState<FieldValues>} [props.formState] - The form state object from react-hook-form.
 * @param {boolean} [props.noMouseEvent] - Whether to disable mouse events without applying disabled styles.
 * @param {boolean} [props.focused] - Whether the input field is focused.
 * @param {boolean} [props.disabled] - Whether the input field is disabled.
 * @param {object} [props.rest] - Additional properties to pass to the input field (Pillar).
 * @returns {JSX.Element} The rendered Input component.
 */
function Input<FormValues extends FieldValues>({
  className,
  label,
  name,
  value,
  onChange,
  clearable,
  onClear,
  icon,
  endIcon,
  iconSize = 24,
  iconHeight = 24,
  iconType = "md",
  loading,
  error,
  filled,
  labelOnTop,
  noAnimation,
  formatter,
  field,
  formState,
  noMouseEvent,
  focused,
  disabled,
  ...rest
}: InputProps<FormValues>) {
  // If there is an error, it will replace the icon with an error icon
  if (!!error) {
    if (!!icon) {
      icon = "error"
    } else {
      endIcon = "error"
    }
  }
  const formattedValue = value || (field && field.value) || ""
  const formattedError =
    error ||
    (formState &&
      formState.errors[name] &&
      formState.errors[name].message &&
      formState.errors[name].message?.toString())
  const calculatedClassNames = clsx(
    "input-element",
    styles["input-container"],
    filled && styles["filled"],
    !labelOnTop && styles["animated-label"],
    !!formattedValue && styles["has-value"],
    noAnimation && styles["without-animation"],
    (!!clearable || !!onClear) && styles["clearable"],
    !!icon && styles["with-icon"],
    !!endIcon && styles["end-icon"],
    !!loading && styles["loading"],
    !!clearable &&
      !!onClear &&
      endIcon &&
      !loading &&
      styles["end-clearable-icon"],
    !!formattedError && styles["error"],
    !!noMouseEvent && styles["no-mouse-event"],
    focused && styles["focused"],
    disabled && styles["disabled"],
    className
  )
  const handleClear = () => {
    if (disabled) return
    if (!!onClear) {
      onClear(name)
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || noMouseEvent) return
    if (!!onChange) {
      let changedValue = e.currentTarget.value
      if (!!formatter) {
        if (formatter instanceof Array) {
          formatter.forEach((formatterName) => {
            changedValue = inputFormat(formatterName, changedValue)
          })
        } else {
          changedValue = inputFormat(formatter, changedValue)
        }
      }
      if (!!onChange) {
        onChange(name, changedValue === "" ? undefined : changedValue)
      }
    }
  }
  const isNeedToShowClearButton =
    !disabled && !!clearable && !!onClear && !loading && !!formattedValue
  return (
    <FormField
      label={(!!labelOnTop && label) || undefined}
      error={formattedError}
      {...rest}
    >
      <div className={calculatedClassNames}>
        {!!icon && (
          <Icon
            type={iconType}
            name={icon}
            size={iconSize}
            customIconLink={icon}
            width={iconSize}
            height={iconHeight || iconSize}
            alt={icon}
            className={styles["input-icon"]}
          />
        )}
        <input onChange={handleChange} {...rest} value={formattedValue} />
        {!labelOnTop && !!label && (
          <label>
            <Text className={styles["label-text"]} type="fit-line">
              {label}
            </Text>
          </label>
        )}
        <fieldset aria-hidden>
          {!labelOnTop && !filled && label && (
            <legend>
              <Text className={styles["label-text"]} type="fit-line">
                {label}
              </Text>
            </legend>
          )}
        </fieldset>
        {!!isNeedToShowClearButton && (
          <Button
            className={clsx(styles["clear-button"], "input-clear-button")}
            icon="clear"
            text
            iconSize={24}
            cancel
            onClick={handleClear}
          />
        )}
        {!!endIcon && !loading && (
          <Icon
            type={iconType}
            name={endIcon}
            size={iconSize}
            customIconLink={endIcon}
            width={iconSize}
            height={iconHeight || iconSize}
            alt={endIcon}
            className={styles["input-icon"]}
          />
        )}
        {!!loading && (
          <div className={styles["input-loader"]}>
            <Loader size="sm" />
          </div>
        )}
      </div>
    </FormField>
  )
}
export default Input
