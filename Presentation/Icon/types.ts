export interface IconStyledProps {
  size: number
}

export type IconType = "md" | "fa" | "custom"

type FaIconType = "lg" | "2x" | "3x" | "4x" | "5x" | "fw"

interface BaseIconProps {
  /** Icon type */
  type: IconType
  /** Icon size in px */
  size?: number
  /** Classes */
  className?: string
}

interface MDIconProps extends BaseIconProps {
  type: "md"
  /**
   * Icon name for Material icon (@link https://fonts.google.com/icons),
   *  or for font-awesome (@link https://fontawesome.com/icons)
   */
  name: string
}

interface FAIconProps extends BaseIconProps {
  type: "fa"
  /**
   * Icon name for Material icon (@link https://fonts.google.com/icons),
   *  or for font-awesome (@link https://fontawesome.com/icons)
   */
  name: string
  /** Font-awesome icon subtype */
  faType?: FaIconType
}

interface CustomIconProps extends BaseIconProps {
  type: "custom"
  /** Link to the image if you need to use a third-party icon */
  customIconLink: string
  /** alt for the image */
  alt: string
  /** Width of the third-party icon in px */
  width?: number
  /** Height of the third-party icon in px */
  height?: number
}

/**
 * Component implementing all icon variants. For material-icon and font-awesome, you need to specify the name.
 * For a third-party icon, you need to specify the image link and size
 */
export type IconProps = MDIconProps | FAIconProps | CustomIconProps
