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
// Styles and types
import { InputProps } from "./types"
import styles from "./styles.module.scss"
import { inputFormat } from "./formatters"

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
    className
  )
  const handleClear = () => {
    if (!!onClear) {
      onClear(name)
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (noMouseEvent) return
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
    !!clearable && !!onClear && !loading && !!formattedValue
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
