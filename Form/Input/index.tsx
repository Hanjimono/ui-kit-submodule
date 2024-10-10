"use client"
// System
import clsx from "clsx"
// Ui
import FormField from "../Field"
import Button from "@/ui/Actions/Button"
import Icon from "@/ui/Presentation/Icon"
import Loader from "@/ui/Presentation/Loader"
import Text from "@/ui/Presentation/Text"
// Styles and types
import { InputProps } from "./types"
import styles from "./styles.module.scss"

function separateProps<T, U>(
  props: T,
  keys: (keyof U)[]
): [U, Omit<T, keyof U>] {
  const matchedProps = {} as U
  const remainingProps = {} as Omit<T, keyof U>

  for (const key in props) {
    if (keys.includes(key as any)) {
      ;(matchedProps as any)[key] = (props as any)[key]
    } else {
      ;(remainingProps as any)[key] = (props as any)[key]
    }
  }

  return [matchedProps, remainingProps]
}

function Input({
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
  ...rest
}: InputProps) {
  // If there is an error, it will replace the icon with an error icon
  if (!!error) {
    if (!!icon) {
      icon = "error"
    } else {
      endIcon = "error"
    }
  }
  const calculatedClassNames = clsx(
    styles["input-container"],
    filled && styles["filled"],
    !labelOnTop && styles["animated-label"],
    !!value && styles["has-value"],
    noAnimation && styles["without-animation"],
    (!!clearable || !!onClear) && styles["clearable"],
    !!icon && styles["with-icon"],
    !!endIcon && styles["end-icon"],
    !!loading && styles["loading"],
    (!!clearable || !!onClear) &&
      endIcon &&
      !loading &&
      styles["end-clearable-icon"],
    !!error && styles["error"],
    className
  )
  const handleClear = () => {
    if (!!onClear) {
      onClear(name)
    } else if (!!onChange) {
      onChange(name, undefined)
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
  const isNeedToShowClearButton = (!!clearable || !!onClear) && !loading
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
        <input name={name} onChange={handleChange} value={value} {...rest} />
        {!labelOnTop && !!label && (
          <label>
            <Text className={styles["label-text"]} type="fit-line">
              {label}
            </Text>
          </label>
        )}
        <fieldset aria-hidden>
          {!labelOnTop && label && (
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
