"use client"
// system
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cva, cx } from "class-variance-authority"

// UI
import Icon from "@/ui/Presentation/Icon"
import Loader from "@/ui/Presentation/Loader"
import { smartCvaWrapper } from "@/ui/Skeleton/utils"

// Types and styles
import { ButtonProps } from "./types"

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
 * @param {string} link - If provided, renders the button as a link.
 * @param {boolean} text - If true, makes the button transparent and borderless.
 * @param {boolean} wide - If true, makes the button take the full width of its container.
 * @param {string} target - Specifies where to open the linked document.
 * @param {boolean} isCustomSize - If true, makes the button have a custom size.
 * @param {boolean} isNoPadding - If true, makes the button have no padding.
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
  iconSize,
  iconHeight,
  iconType = "md",
  loading,
  transparent,
  link = "",
  text,
  wide,
  target,
  isCustomSize,
  isNoPadding,
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
  if (!iconSize) {
    iconSize = onlyIcon ? 23 : 18
  }
  const calculatedDisabled = disabled || loading
  const calculatedClassNames = smartCvaWrapper(
    buttonStyles,
    {
      background: (!transparent && !text && theme) || false,
      border: transparent ? theme : undefined,
      active: !calculatedDisabled && !transparent && !text ? theme : undefined,
      activeText:
        !calculatedDisabled && (text || transparent) ? theme : undefined,
      activeBorder: !calculatedDisabled && transparent ? theme : undefined,
      disabled: calculatedDisabled,
      round: !!onlyIcon,
      size: !isCustomSize,
      padding: !isNoPadding && !onlyIcon,
      wide: !!wide,
      text: !!text && theme
    },
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
        <div className="backdrop-blur-sm absolute inset-0">
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
          className={cx(!onlyIcon && "mr-1")}
        />
      )}
      {!!loading && !!icon && !endIcon && (
        <div className={cx(!onlyIcon && "mr-1")}>
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
          className={"ml-1"}
        />
      )}
      {!!loading && !!endIcon && (
        <div className={"ml-1"}>
          <Loader size="xs" />
        </div>
      )}
    </ConditionalButtonComponent>
  )
}

function ConditionalButtonComponent({ link, ...rest }: ButtonProps) {
  if (!!link) return <Link href={link} {...rest} />
  return (
    <motion.button
      whileTap={rest.disabled ? undefined : { scale: 0.98 }}
      {...rest}
    />
  )
}

export const buttonStyles = cva(
  "button flex justify-center items-center relative box-border transition-colors overflow-hidden",
  {
    variants: {
      background: {
        primary: "bg-primary-main text-white",
        secondary: "bg-secondary-main text-white",
        success: "bg-success-main text-success-text",
        cancel: "bg-cancel-main text-cancel-text",
        remove: "bg-remove-main text-remove-text",
        unset: ""
      },
      border: {
        primary: "border border-primary-main text-primary-main",
        secondary: "border border-secondary-main text-secondary-main",
        success: "border border-success-main text-success-main",
        cancel: "border border-cancel-main text-cancel-main",
        remove: "border border-remove-main text-remove-main"
      },
      text: {
        primary: "text-primary-main",
        secondary: "text-secondary-main",
        success: "text-success-main",
        cancel: "text-cancel-main",
        remove: "text-remove-main"
      },
      active: {
        primary: "hover:bg-primary-hover active:bg-primary-pressed",
        secondary: "hover:bg-secondary-hover active:bg-secondary-pressed",
        success: "hover:bg-success-hover active:bg-success-pressed",
        cancel: "hover:bg-cancel-hover active:bg-cancel-pressed",
        remove: "hover:bg-remove-hover active:bg-remove-pressed"
      },
      activeText: {
        primary: "hover:text-primary-hover active:text-primary-pressed",
        secondary: "hover:text-secondary-hover active:text-secondary-pressed",
        success: "hover:text-success-hover active:text-success-pressed",
        cancel: "hover:text-cancel-hover active:text-cancel-pressed",
        remove: "hover:text-remove-hover active:text-remove-pressed"
      },
      activeBorder: {
        primary: "hover:border-primary-hover active:border-primary-pressed",
        secondary:
          "hover:border-secondary-hover active:border-secondary-pressed",
        success: "hover:border-success-hover active:border-success-pressed",
        cancel: "hover:border-cancel-hover active:border-cancel-pressed",
        remove: "hover:border-remove-hover active:border-remove-pressed"
      },
      disabled: {
        default: "opacity-70 cursor-default",
        unset: "cursor-pointer"
      },
      round: {
        default: "rounded-full w-10",
        unset: " rounded-lg"
      },
      size: {
        default: "h-10",
        unset: ""
      },
      padding: {
        default: "py-4 px-5",
        unset: ""
      },
      wide: {
        default: "w-full",
        unset: ""
      }
    }
  }
)

export default Button
