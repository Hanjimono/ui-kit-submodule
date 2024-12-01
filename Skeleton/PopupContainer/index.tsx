"use client"
// System
import { useMemo, useRef } from "react"
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import { AnimatePresence, motion } from "framer-motion"
// Ui
import { useDynamicContainerSizes, useOuterClick } from "@/ui/Skeleton/Hooks"
import Portal from "@/ui/Skeleton/Portal"
import { calculateStyles } from "./utils"
// Types and styles
import { PopupContainerProps } from "./types"

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
 * @param {boolean} mask - If true, renders a mask behind the popup when it is active.
 * @param {string[]} excludeClickListenerList - List of class names to exclude from the click event listener.
 * @param {AnimationProps} animationProps - Custom framer-motion animation properties for the popup.
 * @param {number} maskTransitionDuration - Duration of the mask transition.
 * @param {React.CSSProperties} style - Custom styles to apply to the popup container.
 * @param {DOMRect} parentPositionSettings - The position settings of the parent element.
 * @param {"top" | "bottom"} positionDirection - The direction in which the popup should be positioned.
 * @param {boolean} autoReposition - If true, the popup will reposition itself based on the parent element's position.
 * @param {number} positionVerticalOffset - The offset to apply to the popup position vertically.
 * @param {number} positionHorizontalOffset - The offset to apply to the popup position horizontally.
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
  mask,
  excludeClickListenerList,
  animationProps,
  maskTransitionDuration = 0.2,
  style,
  parentPositionSettings,
  positionDirection,
  autoReposition,
  positionHorizontalOffset,
  positionVerticalOffset
}: PopupContainerProps) {
  // Reference to the popup container div
  const popupRef = useRef<HTMLDivElement>(null)
  const [popupHeight, popupWidth] = useDynamicContainerSizes(
    popupRef,
    autoReposition && isActive
  )
  useOuterClick(
    onClose,
    popupRef,
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

  const [calculatedStyles, formattedPosition] = useMemo(() => {
    return calculateStyles(
      style,
      parentPositionSettings,
      autoReposition,
      positionDirection,
      positionVerticalOffset,
      positionHorizontalOffset,
      popupHeight,
      popupWidth
    )
  }, [
    style,
    parentPositionSettings,
    autoReposition,
    positionDirection,
    positionVerticalOffset,
    positionHorizontalOffset,
    popupHeight,
    popupWidth
  ])

  // Combine class names based on props
  const calculatedClassNames = twMerge(
    cx(
      "popup-container z-select absolute hidden",
      isActive && "block",
      withTransition && "block max-h-0 overflow-hidden transition",
      withShadow && "shadow-lg",
      withTransition && isActive && "h-fit",
      formattedPosition,
      className
    )
  )

  return (
    <>
      <motion.div
        style={calculatedStyles}
        className={calculatedClassNames}
        onMouseLeave={handleMouseLeave}
        ref={popupRef}
        {...animationProps}
      >
        {children}
      </motion.div>
      <Portal>
        <AnimatePresence>
          {mask && isActive && (
            <motion.div
              className={
                "popup-mask opacity-65 bg-mask fixed inset-0 z-popup-mask"
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              transition={{ duration: maskTransitionDuration }}
            />
          )}
        </AnimatePresence>
      </Portal>
    </>
  )
}

export default PopupContainer
