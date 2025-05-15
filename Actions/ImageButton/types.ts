import { SmartImageProps } from "@/ui/Presentation/SmartImage/types"

/** An interactive image button with optional title and description overlays. */
export interface ImageButtonProps extends SmartImageProps {
  /** Additional class names */
  className?: string
  /** A title for the image block */
  title?: string
  /** An additional, a little smaller text for the image block */
  description?: string
  /** Button behaves like a link */
  link?: string
  /** Function called when the button is clicked */
  onClick?: (e: React.BaseSyntheticEvent) => void
  /** Removes the default hover effect for colors */
  isWithoutSaturationChange?: boolean
  /** Removes the default text background effect */
  isWithoutTextBackground?: boolean
}
