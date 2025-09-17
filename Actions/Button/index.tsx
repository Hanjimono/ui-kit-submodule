"use client"
// system
import React, { useCallback } from "react"
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
 * @param {boolean} isLoading - If true, shows a isLoading indicator inside the button.
 * @param {boolean} transparent - If true, makes the button background transparent.
 * @param {string} link - If provided, renders the button as a link.
 * @param {boolean} isText - If true, makes the button transparent and borderless.
 * @param {boolean} isWide - If true, makes the button take the full width of its container.
 * @param {string} target - Specifies where to open the linked document.
 * @param {boolean} isCustomSize - If true, makes the button have a custom size.
 * @param {boolean} isNoPadding - If true, makes the button have no padding.
 * @param {boolean} isSmall - If true, makes the button smaller in height.
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
  isLoading,
  transparent,
  link = "",
  isText,
  isWide,
  target,
  isCustomSize,
  isNoPadding,
  isSmall,
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
  const isOnlyIcon = children === undefined && (!!icon || !!endIcon)
  if (!iconSize) {
    iconSize = isOnlyIcon ? 23 : 18
  }
  const calculatedDisabled = disabled || isLoading
  const calculatedClassNames = smartCvaWrapper(
    buttonStyles,
    {
      background: (!transparent && !isText && theme) || false,
      border: transparent ? theme : undefined,
      active:
        !calculatedDisabled && !transparent && !isText ? theme : undefined,
      activeText:
        !calculatedDisabled && (isText || transparent) ? theme : undefined,
      activeBorder: !calculatedDisabled && transparent ? theme : undefined,
      disabled: calculatedDisabled,
      round: !!isOnlyIcon,
      size: isSmall ? "small" : !isCustomSize,
      padding: isSmall && !isNoPadding ? "small" : !isNoPadding && !isOnlyIcon,
      isWide: !!isWide,
      isText: !!isText && theme
    },
    className
  )
  const calculatedIconStyles = smartCvaWrapper(buttonIconStyles, {
    position: !isOnlyIcon ? (!!endIcon ? "right" : "left") : undefined,
    color: transparent
      ? "transparent_" + theme
      : !isOnlyIcon
        ? theme
        : undefined
  })
  const handleClick = useCallback(
    (e: React.BaseSyntheticEvent) => {
      e.stopPropagation()
      if (calculatedDisabled) {
        return
      }
      if (onClick) {
        onClick(e)
      }
    },
    [onClick, calculatedDisabled]
  )
  return (
    <ConditionalButtonComponent
      className={calculatedClassNames}
      link={link}
      disabled={calculatedDisabled}
      onClick={handleClick}
      {...rest}
    >
      {!!isLoading && !icon && (
        <div className="backdrop-blur-xs absolute inset-0">
          <Loader size="xs" />
        </div>
      )}
      {!!icon && !isLoading && (
        <Icon
          type={iconType}
          name={icon}
          size={iconSize}
          customIconLink={icon}
          width={iconSize}
          height={iconHeight || iconSize}
          alt={""}
          className={calculatedIconStyles}
        />
      )}
      {!!isLoading && !!icon && !endIcon && (
        <div className={cx(!isOnlyIcon && "mr-1")}>
          <Loader size="xs" />
        </div>
      )}
      {children}
      {!!endIcon && !isLoading && (
        <Icon
          type={iconType}
          name={endIcon}
          size={iconSize}
          customIconLink={endIcon}
          width={iconSize}
          height={iconHeight || iconSize}
          alt={""}
          className={calculatedIconStyles}
        />
      )}
      {!!isLoading && !!endIcon && (
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
  "button flex justify-center items-center relative box-border transition-colors overflow-hidden cursor-pointer",
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
      isText: {
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
        unset: "rounded-button"
      },
      size: {
        default: "h-button",
        small: "h-button-small",
        unset: ""
      },
      padding: {
        default: "p-button",
        small: "p-button-small",
        unset: ""
      },
      isWide: {
        default: "w-full",
        unset: "w-fit"
      }
    }
  }
)

export const buttonIconStyles = cva("button-icon", {
  variants: {
    position: {
      left: "mr-almost-same",
      right: "ml-almost-same",
      unset: ""
    },
    color: {
      primary: "text-primary-icon",
      secondary: "text-secondary-icon",
      success: "text-success-icon",
      cancel: "text-cancel-icon",
      remove: "text-remove-icon",
      transparent_primary: "text-primary-transparent-icon",
      transparent_secondary: "text-secondary-transparent-icon",
      transparent_success: "text-success-transparent-icon",
      transparent_cancel: "text-cancel-transparent-icon",
      transparent_remove: "text-remove-transparent-icon",
      unset: ""
    }
  }
})

export default Button
