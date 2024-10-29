"use client"
// System
import {
  CSSProperties,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
// Ui
import { useOuterClick } from "@/ui/Skeleton/Hooks"
import Portal from "@/ui/Skeleton/Portal"
// Types and styles
import { PopupContainerProps } from "./types"
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
 * @param {boolean} mask - If true, renders a mask behind the popup when it is active.
 * @param {string[]} excludeClickListenerList - List of class names to exclude from the click event listener.
 * @param {AnimationProps} animationProps - Custom framer-motion animation properties for the popup.
 * @param {number} maskTransitionDuration - Duration of the mask transition.
 * @param {React.CSSProperties} style - Custom styles to apply to the popup container.
 * @param {DOMRect} parentPositionSettings - The position settings of the parent element.
 * @param {"top" | "bottom"} positionDirection - The direction in which the popup should be positioned.
 * @param {boolean} autoReposition - If true, the popup will reposition itself based on the parent element's position.
 * @param {number} positionOffset - The offset to apply to the popup position.
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
  positionOffset
}: PopupContainerProps) {
  // Reference to the popup container div
  const popupRef = useRef<HTMLDivElement>(null)
  const [popupHeight, setPopupHeight] = useState<number>(0)
  useLayoutEffect(() => {
    if (isActive) {
      setPopupHeight(popupRef.current?.clientHeight || 0)
    }
  }, [isActive])
  // Combine class names based on props
  const calculatedClassNames = clsx(
    styles["popup-container"],
    className,
    withTransition && styles["with-transition"],
    withShadow && styles["with-shadow"],
    isActive && styles["active"]
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

  const calculatedStyles = useMemo(() => {
    const styles: CSSProperties = { ...style }

    if (parentPositionSettings) {
      styles.width = parentPositionSettings.width

      /**
       * Calculates the top position for a popup container based on the given top and bottom positions.
       * It considers an optional offset, the height of the popup, and whether auto-repositioning is enabled.
       *
       * @param {number} top - The top position of the reference element.
       * @param {number} bottom - The bottom position of the reference element.
       * @returns {number} - The calculated top position for the popup container.
       */
      const calculateTopPosition = (top: number, bottom: number) => {
        const offset = positionOffset ?? 0
        const topPosition = top - popupHeight - offset
        const bottomPosition = bottom + offset

        if (autoReposition) {
          if (positionDirection === "top" && topPosition < 0) {
            return bottomPosition
          }
          if (
            positionDirection === "bottom" &&
            bottomPosition + popupHeight > window.innerHeight
          ) {
            return topPosition
          }
        }

        return positionDirection === "top" ? topPosition : bottomPosition
      }

      styles.top = calculateTopPosition(
        parentPositionSettings.top,
        parentPositionSettings.bottom
      )
      styles.left = parentPositionSettings.left
    }

    return styles
  }, [
    style,
    parentPositionSettings,
    positionDirection,
    popupHeight,
    autoReposition,
    positionOffset
  ])

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
              className={styles["mask"]}
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
