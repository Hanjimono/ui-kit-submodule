// System
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import clsx from "clsx"
import CSS from "csstype"
// Types and styles
import { PopupContainerProps, PopupPosition } from "./types"
import styles from "./styles.module.scss"

/**
 * A skeleton component for displaying a popup container with other components inside. Like list of select props, etc.
 */
function PopupContainer({
  children,
  className,
  isActive,
  onClose,
  checkHover,
  checkOuterClick,
  withTransition,
  withShadow,
  position,
  mask
}: PopupContainerProps) {
  // Combine class names based on props
  const calculatedClassNames = clsx(
    styles["popup-container"],
    className,
    withTransition && styles["with-transition"],
    withShadow && styles["with-shadow"],
    isActive && styles["active"]
  )

  // Reference to the popup container div
  const newRef = useRef<HTMLDivElement>(null)

  // Add or remove event listener for outside clicks based on checkOuterClick prop
  useEffect(() => {
    // Handle clicks outside the popup container
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        onClose &&
        isActive &&
        newRef.current &&
        !newRef.current.contains(e.target as Node)
      ) {
        setTimeout(onClose, 100)
      }
    }

    if (checkOuterClick) {
      document.addEventListener("mousedown", handleOutsideClick)
    }
    return () => {
      if (checkOuterClick) {
        document.removeEventListener("mousedown", handleOutsideClick)
      }
    }
  }, [checkOuterClick, isActive, onClose])

  // Handle mouse leave event
  const handleMouseLeave = () => {
    if (onClose && checkHover) {
      onClose()
    }
  }

  const style: CSS.Properties = {}
  if (position) {
    Object.entries(position).forEach(([key, value]) => {
      if (value !== undefined) {
        style[key as keyof PopupPosition] = `${value}px`
      }
    })
  }

  return (
    <>
      <div
        style={style}
        className={calculatedClassNames}
        onMouseLeave={handleMouseLeave}
        ref={newRef}
      >
        {children}
      </div>
      {mask &&
        isActive &&
        createPortal(<div className={styles["mask"]}></div>, document.body)}
    </>
  )
}

export default PopupContainer
