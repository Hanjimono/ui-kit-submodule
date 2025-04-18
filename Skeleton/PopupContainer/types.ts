import { AnimationProps } from "framer-motion"

/**
 * A skeleton component for displaying a popup container with other components inside. Like list of select props, etc.
 */
export interface PopupContainerProps {
  /** The content to be displayed inside the popup container */
  children?: React.ReactNode
  /** Additional class names for styling the popup container */
  className?: String
  /** Function to be called when the popup container is closed */
  onClose?: () => void
  /** Indicates whether the popup container is active */
  isActive: boolean
  /** Determines if a mask should be displayed behind the popup container */
  mask?: boolean
  /** Checks if the popup container should respond to hover events */
  checkHover?: boolean
  /** Checks if the popup container should close when clicking outside of it */
  checkOuterClick?: boolean
  /** Indicates if the popup container should have transition effects */
  withTransition?: boolean
  /** Indicates if the popup container should have a shadow */
  withShadow?: boolean
  /** List of class names to exclude from the click event listener */
  excludeClickListenerList?: string[]
  /** Custom framer-motion animation properties for the popup container */
  animationProps?: AnimationProps
  /** Custom styles to apply to the popup container */
  style?: React.CSSProperties
  /** Duration of the mask transition */
  maskTransitionDuration?: number
  /** The position settings of the parent element. */
  parentPositionSettings?: DOMRect
  /** The direction in which the popup should be positioned */
  positionDirection?: "left" | "right" | "top" | "bottom"
  /** The offset to apply to the popup position vertically. */
  positionVerticalOffset?: number
  /** The offset to apply to the popup position horizontally. */
  positionHorizontalOffset?: number
  /** If true, the popup will reposition itself based on the parent element's position. */
  autoReposition?: boolean
}
