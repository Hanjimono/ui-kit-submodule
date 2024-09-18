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

/** Simple button component */
function Button({
  children,
  className,
  theme,
  green,
  blue,
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
  if (!!green) {
    theme = "green"
  }
  if (!!blue) {
    theme = "blue"
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
    theme = "green"
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

export function FormSubmitButton(props: ButtonProps) {
  return <Button {...props} />
}

export default Button
