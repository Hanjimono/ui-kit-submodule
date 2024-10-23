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

export interface DrawerProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  popupWrapperClassName?: string
  position?: DrawerPosition
  from?: DrawerPopupFrom
  mask?: boolean
  isActive?: boolean
  onClose?: () => void
}
