// System
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import clsx from "clsx"
// Types and styles
import { PopupContainerProps } from "./types"
import styles from "./styles.module.scss"

function PopupContainer({
  children,
  className,
  isActive,
  onClose,
  checkHover,
  checkOuterClick,
  withTransition,
  withShadow,
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

  return (
    <>
      <div
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
