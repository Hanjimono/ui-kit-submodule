import React from "react"
import { IconType } from "@/ui/Presentation/Icon/types"

export type ThemeType = "primary" | "secondary" | "tool" | "light" | "remove"

/** Button component properties */
export interface ButtonProps {
  children?: React.ReactNode
  /** List of CSS classes */
  className?: string
  /** Primary button color */
  primary?: boolean
  /** Light button color */
  light?: boolean
  /** Secondary button color */
  secondary?: boolean
  /** Remove button color (used for a "remove" action) */
  remove?: boolean
  /** Tool button color, for something like a toolbar option, usually it contains only icon */
  tool?: boolean
  /** Button color theme */
  theme?: ThemeType
  /** Flag that removes the button's background color, leaving only the border */
  transparent?: boolean
  /** Marks the button as disabled and removes click interaction */
  disabled?: boolean
  /** Function called when the button is clicked */
  onClick?: (e: React.BaseSyntheticEvent) => void
  /** Button will occupy all available horizontal space */
  isWide?: boolean
  /** Name of the icon displayed on the button */
  icon?: string
  /** For custom icons, this should be a URL to an image used when hovering */
  customIconHover?: string
  /** Name of the icon displayed at the end of the button. For custom icons, this should be a URL to an image */
  endIcon?: string
  /** Size of the icon in pixels. For custom icons, this is the width */
  iconSize?: number
  /** Height for custom icons if it differs from the width */
  iconHeight?: number
  /** Type of icon displayed on the button. Defaults to "material-icons" */
  iconType?: IconType
  /** Flag to display a loading animation on the button */
  isLoading?: boolean
  /** Removes both the background and border from the button, leaving only the text */
  isText?: boolean
  /** Button behaves like a link */
  link?: string
  /** Target attribute for link button */
  target?: string
  /** Removes all paddings style settings */
  isNoPadding?: boolean
  /** Removes height style so you can change standard button height */
  isCustomSize?: boolean
  /** Makes the button smaller in height */
  isSmall?: boolean
}
