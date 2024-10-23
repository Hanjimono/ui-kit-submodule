import { AnimationProps } from "framer-motion"

export interface PopupPosition {
  top?: number
  left?: number
  right?: number
  bottom?: number
  width?: number
  height?: number
}
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
  /** Custom position for the popup container */
  position?: PopupPosition
  /** List of class names to exclude from the click event listener */
  excludeClickListenerList?: string[]
  animationProps?: AnimationProps
  style?: React.CSSProperties
  maskTransitionDuration?: number
}
