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
 * @param {boolean} tool - If true, sets the button theme to "tool".
 * @param {boolean} light - If true, sets the button theme to "light".
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
 * @param {string} customIconHover - For custom icons, this should be a URL to an image used when hovering.
 *
 * @returns {JSX.Element} The rendered button component.
 */
function Button({
  children,
  className,
  theme,
  primary,
  secondary,
  tool,
  light,
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
  customIconHover,
  ...rest
}: ButtonProps) {
  if (!!primary) {
    theme = "primary"
  }
  if (!!secondary) {
    theme = "secondary"
  }
  if (!!light) {
    theme = "light"
  }
  if (!!remove) {
    theme = "remove"
  }
  if (!!tool) {
    theme = "tool"
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
    color: transparent ? "transparent-" + theme : theme
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
          hoverIconLink={customIconHover}
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
          hoverIconLink={customIconHover}
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
        tool: "bg-tool-main text-tool-text",
        light: "bg-light-main text-light-text",
        remove: "bg-remove-main text-remove-text",
        unset: ""
      },
      border: {
        primary: "border border-primary-main text-primary-main",
        secondary: "border border-secondary-main text-secondary-main",
        tool: "border border-tool-main text-tool-main",
        light: "border border-light-main text-light-main",
        remove: "border border-remove-main text-remove-main"
      },
      isText: {
        primary: "text-primary-main",
        secondary: "text-secondary-main",
        tool: "text-tool-main",
        light: "text-light-main",
        remove: "text-remove-main"
      },
      active: {
        primary: "hover:bg-primary-hover active:bg-primary-pressed",
        secondary: "hover:bg-secondary-hover active:bg-secondary-pressed",
        tool: "hover:bg-tool-hover active:bg-tool-pressed",
        light: "hover:bg-light-hover active:bg-light-pressed",
        remove: "hover:bg-remove-hover active:bg-remove-pressed"
      },
      activeText: {
        primary: "hover:text-primary-hover active:text-primary-pressed",
        secondary: "hover:text-secondary-hover active:text-secondary-pressed",
        tool: "hover:text-tool-hover active:text-tool-pressed",
        light: "hover:text-light-hover active:text-light-pressed",
        remove: "hover:text-remove-hover active:text-remove-pressed"
      },
      activeBorder: {
        primary: "hover:border-primary-hover active:border-primary-pressed",
        secondary:
          "hover:border-secondary-hover active:border-secondary-pressed",
        tool: "hover:border-tool-hover active:border-tool-pressed",
        light: "hover:border-light-hover active:border-light-pressed",
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
      primary: "text-primary-icon hover:text-primary-icon-hover",
      secondary: "text-secondary-icon hover:text-secondary-icon-hover",
      tool: "text-tool-icon hover:text-tool-icon-hover",
      light: "text-light-icon hover:text-light-icon-hover",
      remove: "text-remove-icon hover:text-remove-icon-hover",
      "transparent-primary":
        "text-primary-transparent-icon hover:text-primary-transparent-icon-hover",
      "transparent-secondary":
        "text-secondary-transparent-icon hover:text-secondary-transparent-icon-hover",
      "transparent-tool":
        "text-tool-transparent-icon hover:text-tool-transparent-icon-hover",
      "transparent-light":
        "text-light-transparent-icon hover:text-light-transparent-icon-hover",
      "transparent-remove":
        "text-remove-transparent-icon hover:text-remove-transparent-icon-hover",
      unset: ""
    }
  }
})

export default Button
