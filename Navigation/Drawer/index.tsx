// System
import clsx from "clsx"
import { AnimatePresence } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
// Ui
import PopupContainer from "@/ui/Skeleton/PopupContainer"
// Styles and types
import { DrawerProps } from "./types"
import styles from "./styles.module.scss"

/**
 * Drawer component that provides a sliding panel from various positions with animation.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the drawer.
 * @param {string} from - The direction from which the drawer should animate.
 * @param {string} [position="left"] - The position of the drawer (left, right, top, bottom).
 * @param {boolean} isActive - Determines if the drawer is active and visible.
 * @param {string} className - Additional class names for the drawer container.
 * @param {string} popupWrapperClassName - Additional class names for the popup wrapper.
 * @param {boolean} mask - Determines if a mask should be displayed behind the drawer.
 * @param {object} rest - Additional props to be passed to the PopupContainer.
 *
 * @returns {React.ReactPortal} A portal that renders the drawer component.
 */
function Drawer({
  children,
  from,
  position = "left",
  isActive,
  className,
  popupWrapperClassName,
  mask,
  ...rest
}: DrawerProps) {
  const calculatedClassNames = clsx(styles["drawer-container"], className)

  // Local state for animation
  // Without this, the drawer will not animate properly
  // Mask removing should be triggered slightly before the drawer is closed
  const [localActive, setLocalActive] = useState(isActive)
  const [localMask, setLocalMask] = useState(mask)
  useEffect(() => {
    if (mask && isActive !== localActive) {
      if (isActive) {
        setLocalActive(true)
        setLocalMask(true)
      } else {
        setTimeout(() => setLocalActive(false), 100)
        setLocalMask(false)
      }
    }
  }, [mask, localActive, isActive])

  const correctIsActive = useMemo(() => {
    return (mask && localActive) || isActive
  }, [mask, localActive, isActive])

  const animationVariants = {
    left: {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"
    },
    right: {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
    },
    top: {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
    },
    bottom: {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
    },
    "left-top": {
      clipPath: "polygon(0 0, 0 0, 0 0, 0 0)"
    },
    "left-bottom": {
      clipPath: "polygon(0 100%, 0 100%, 0 100%, 0 100%)"
    },
    "right-top": {
      clipPath: "polygon(100% 0, 100% 0, 100% 0, 100% 0)"
    },
    "right-bottom": {
      clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)"
    },
    final: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
    }
  }

  //Calculating animation depending on the position and from prop
  //Animation could not start from the opposite side
  const formattedFrom = useMemo(() => {
    let formattedFrom = from
    if (!formattedFrom) {
      formattedFrom = position
    } else {
      const oppositePositions = {
        left: ["right", "top", "bottom"],
        right: ["left", "top", "bottom"],
        top: ["bottom", "left", "right"],
        bottom: ["top", "left", "right"]
      }

      if (oppositePositions[position].includes(formattedFrom)) {
        formattedFrom = position
      }
    }
    return formattedFrom
  }, [from, position])

  const animatedProps = useMemo(() => {
    return {
      initial: formattedFrom,
      animate: "final",
      exit: formattedFrom,
      transition: { duration: 0.3, bounce: 0 },
      variants: animationVariants
    }
  }, [formattedFrom, animationVariants])

  const style = useMemo(() => {
    return {
      minWidth: position == "top" || position == "bottom" ? "100%" : "",
      maxWidth: position == "top" || position == "bottom" ? "100%" : "",
      minHeight: position == "left" || position == "right" ? "100%" : "",
      maxHeight: position == "left" || position == "right" ? "100%" : "",
      top: position == "bottom" ? undefined : 0,
      bottom: position == "bottom" ? 0 : undefined,
      left: position == "right" ? undefined : 0,
      right: position == "right" ? 0 : undefined
    }
  }, [position])

  return createPortal(
    <AnimatePresence mode="popLayout">
      {correctIsActive && (
        <PopupContainer
          style={style}
          animationProps={animatedProps}
          className={clsx(
            styles["drawer-popup-wrapper"],
            popupWrapperClassName
          )}
          isActive={correctIsActive}
          checkOuterClick
          mask={localMask}
          {...rest}
        >
          <div className={calculatedClassNames}>{children}</div>
        </PopupContainer>
      )}
    </AnimatePresence>,
    document.body
  )
}
export default Drawer
