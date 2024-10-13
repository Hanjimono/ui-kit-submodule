"use client"
// System
import clsx from "clsx"
import { useEffect } from "react"
// Ui
import FormField from "../Field"
import Button from "@/ui/Actions/Button"
import Icon from "@/ui/Presentation/Icon"
import Loader from "@/ui/Presentation/Loader"
import Text from "@/ui/Presentation/Text"
// Styles and types
import { InputProps } from "./types"
import styles from "./styles.module.scss"
import { FieldValues, useController } from "react-hook-form"

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
  control,
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
  const { field } = useController({
    name,
    control
  })
  const formattedValue = value || (field && field.value) || ""
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
    !!error && styles["error"],
    className
  )
  const handleClear = () => {
    if (!!onClear) {
      onClear(name)
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!onChange) {
      let initialValue = e.currentTarget.value
      if (!!onChange) {
        onChange(name, initialValue)
      }
    }
  }
  const isNeedToShowClearButton =
    !!clearable && !!onClear && !loading && !!formattedValue
  return (
    <FormField
      label={(!!labelOnTop && label) || undefined}
      error={error}
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
            className={styles["clear-button"]}
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
