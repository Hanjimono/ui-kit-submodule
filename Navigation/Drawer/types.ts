type DrawerPosition = "left" | "right" | "top" | "bottom"

type DrawerPopupFrom =
  | "left"
  | "left-top"
  | "left-bottom"
  | "right"
  | "right-top"
  | "right-bottom"
  | "top"
  | "bottom"

/** Drawer component that provides a sliding panel from various positions with animation. */
export interface DrawerProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Additional class names for the popup wrapper */
  popupWrapperClassName?: string
  /** The position of the drawer (left, right, top, bottom) */
  position?: DrawerPosition
  /** The direction from which the drawer should animate */
  from?: DrawerPopupFrom
  /** Determines if a mask should be displayed behind the drawer */
  mask?: boolean
  /** Determines if the drawer is active and visible */
  isActive?: boolean
  /** Function to be called when the drawer is closed */
  onClose?: () => void
}
