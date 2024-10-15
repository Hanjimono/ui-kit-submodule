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
 *
 * @param {React.ReactNode} children - The content to be displayed inside the popup.
 * @param {string} className - Additional class names to apply to the popup container.
 * @param {boolean} isActive - Determines if the popup is active and visible.
 * @param {() => void} onClose - Callback function to be called when the popup should be closed.
 * @param {boolean} checkHover - If true, the popup will close when the mouse leaves the container.
 * @param {boolean} checkOuterClick - If true, the popup will close when a click outside the container is detected.
 * @param {boolean} withTransition - If true, applies transition styles to the popup.
 * @param {boolean} withShadow - If true, applies shadow styles to the popup.
 * @param {PopupPosition} position - An object specifying the position of the popup.
 * @param {boolean} mask - If true, renders a mask behind the popup when it is active.
 *
 * @returns {JSX.Element} The rendered PopupContainer component.
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
