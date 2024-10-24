"use client"
// System
import { CSSProperties, useEffect, useMemo, useRef } from "react"
import { createPortal } from "react-dom"
import clsx from "clsx"
import CSS from "csstype"
import { AnimatePresence, motion } from "framer-motion"
// Types and styles
import { PopupContainerProps, PopupPosition } from "./types"
import styles from "./styles.module.scss"
import { useOuterClick } from "../Hooks"

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
 * @param {string[]} excludeClickListenerList - List of class names to exclude from the click event listener.
 * @param {AnimationProps} animationProps - Custom framer-motion animation properties for the popup.
 * @param {React.CSSProperties} style - Custom styles to apply to the popup container.
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
  mask,
  excludeClickListenerList,
  animationProps,
  maskTransitionDuration = 0.2,
  style
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
  useOuterClick(
    onClose,
    newRef,
    isActive,
    checkOuterClick,
    excludeClickListenerList
  )

  // Handle mouse leave event
  const handleMouseLeave = () => {
    if (onClose && checkHover) {
      onClose()
    }
  }

  const calculatedStyles = useMemo(() => {
    let calculatedStyles: CSSProperties = {}
    if (style) {
      calculatedStyles = { ...style }
    }
    if (position) {
      Object.entries(position).forEach(([key, value]) => {
        if (value !== undefined) {
          calculatedStyles[key as keyof PopupPosition] = `${value}px`
        }
      })
    }
    return calculatedStyles
  }, [position, style])

  return (
    <>
      <motion.div
        style={calculatedStyles}
        className={calculatedClassNames}
        onMouseLeave={handleMouseLeave}
        ref={newRef}
        {...animationProps}
      >
        {children}
      </motion.div>
      {createPortal(
        <AnimatePresence>
          {mask && isActive && (
            <motion.div
              className={styles["mask"]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              transition={{ duration: maskTransitionDuration }}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default PopupContainer
