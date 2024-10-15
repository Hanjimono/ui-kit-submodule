"use client"
// system
import React from "react"
import Link from "next/link"
import clsx from "clsx"

// UI
import Icon from "@/ui/Presentation/Icon"
import Loader from "@/ui/Presentation/Loader"

// Types and styles
import { ButtonProps } from "./types"
import styles from "./styles.module.scss"

/**
 * Button component that supports various themes, states, and icons.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the button.
 * @param {string} className - Additional class names to apply to the button.
 * @param {string} theme - The theme of the button, can be overridden by specific props like primary, secondary, etc.
 * @param {boolean} primary - If true, sets the button theme to "primary".
 * @param {boolean} secondary - If true, sets the button theme to "secondary".
 * @param {boolean} success - If true, sets the button theme to "success".
 * @param {boolean} cancel - If true, sets the button theme to "cancel".
 * @param {boolean} remove - If true, sets the button theme to "remove".
 * @param {boolean} disabled - If true, disables the button.
 * @param {Function} onClick - The function to call when the button is clicked.
 * @param {string} icon - The name of the icon to display at the start of the button.
 * @param {string} endIcon - The name of the icon to display at the end of the button.
 * @param {number} iconSize - The size of the icon.
 * @param {number} iconHeight - The height of the icon.
 * @param {string} iconType - The type of the icon.
 * @param {boolean} loading - If true, shows a loading indicator inside the button.
 * @param {boolean} transparent - If true, makes the button background transparent.
 * @param {boolean} borderless - If true, removes the button border.
 * @param {string} link - If provided, renders the button as a link.
 * @param {boolean} text - If true, makes the button transparent and borderless.
 * @param {boolean} wide - If true, makes the button take the full width of its container.
 * @param {string} target - Specifies where to open the linked document.
 *
 * @returns {JSX.Element} The rendered button component.
 */
function Button({
  children,
  className,
  theme,
  primary,
  secondary,
  success,
  cancel,
  remove,
  disabled,
  onClick,
  icon,
  endIcon,
  iconSize = 18,
  iconHeight,
  iconType = "md",
  loading,
  transparent,
  borderless,
  link = "",
  text,
  wide,
  target,
  ...rest
}: ButtonProps) {
  if (!!primary) {
    theme = "primary"
  }
  if (!!secondary) {
    theme = "secondary"
  }
  if (!!cancel) {
    theme = "cancel"
  }
  if (!!remove) {
    theme = "remove"
  }
  if (!!success) {
    theme = "success"
  }
  if (theme == undefined) {
    theme = "primary"
  }
  const onlyIcon = children === undefined && (!!icon || !!endIcon)
  const calculatedDisabled = disabled || loading
  const calculatedClassNames = clsx(
    styles["button"],
    !!icon && styles["with-icon"],
    !!endIcon && styles["end-icon"],
    !!onlyIcon && styles["only-icon"],
    (!!transparent || !!text) && styles["transparent"],
    !!calculatedDisabled && styles["disabled"],
    (!!borderless || !!text) && styles["borderless"],
    !!wide && styles["wide"],
    !!theme && styles[theme],
    className
  )
  return (
    <ConditionalButtonComponent
      className={calculatedClassNames}
      link={link}
      disabled={calculatedDisabled}
      onClick={calculatedDisabled ? undefined : onClick}
      {...rest}
    >
      {!!loading && !icon && (
        <div className={styles["overlay-loader"]}>
          <Loader size="xs" />
        </div>
      )}
      {!!icon && !loading && (
        <Icon
          type={iconType}
          name={icon}
          size={iconSize}
          customIconLink={icon}
          width={iconSize}
          height={iconHeight || iconSize}
          alt={""}
          className={styles["button-icon"]}
        />
      )}
      {!!loading && !!icon && !endIcon && (
        <div className={styles["button-loader"]}>
          <Loader size="xs" />
        </div>
      )}
      {children}
      {!!endIcon && !loading && (
        <Icon
          type={iconType}
          name={endIcon}
          size={iconSize}
          customIconLink={endIcon}
          width={iconSize}
          height={iconHeight || iconSize}
          alt={""}
          className={styles["button-icon"]}
        />
      )}
      {!!loading && !!endIcon && (
        <div className={styles["button-loader"]}>
          <Loader size="xs" />
        </div>
      )}
    </ConditionalButtonComponent>
  )
}

function ConditionalButtonComponent({ link, ...rest }: ButtonProps) {
  if (!!link) return <Link href={link} {...rest} />
  return <button {...rest} />
}

export default Button
