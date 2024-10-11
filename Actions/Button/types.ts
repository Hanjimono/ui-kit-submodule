import React from "react"
import { IconType } from "@/ui/Presentation/Icon/types"

type ThemeType = "primary" | "secondary" | "success" | "cancel" | "remove"

/** Button component properties */
export interface ButtonProps {
  children?: React.ReactNode
  /** List of CSS classes */
  className?: string
  /** Primary button color */
  primary?: boolean
  /** Cancel button color */
  cancel?: boolean
  /** Secondary button color */
  secondary?: boolean
  /** Remove button color (used for a "remove" action) */
  remove?: boolean
  /** Success (or confirmation) button color */
  success?: boolean
  /** Button color theme */
  theme?: ThemeType
  /** Flag that removes the button's background color, leaving only the border */
  transparent?: boolean
  /** Removes the border from the button */
  borderless?: boolean
  /** Marks the button as disabled and removes click interaction */
  disabled?: boolean
  /** Function called when the button is clicked */
  onClick?: (e: React.BaseSyntheticEvent) => void
  /** Button will occupy all available horizontal space */
  wide?: boolean
  /** Name of the icon displayed on the button */
  icon?: string
  /** Name of the icon displayed at the end of the button. For custom icons, this should be a URL to an image */
  endIcon?: string
  /** Size of the icon in pixels. For custom icons, this is the width */
  iconSize?: number
  /** Height for custom icons if it differs from the width */
  iconHeight?: number
  /** Type of icon displayed on the button. Defaults to "material-icons" */
  iconType?: IconType
  /** Flag to display a loading animation on the button */
  loading?: boolean
  /** Removes both the background and border from the button, leaving only the text */
  text?: boolean
  /** Button behaves like a link */
  link?: string
  /** Target attribute for link button */
  target?: string
}
