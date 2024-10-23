// System
import clsx from "clsx"
import { animate, AnimatePresence } from "framer-motion"
// Ui
import PopupContainer from "@/ui/Skeleton/PopupContainer"
// Styles and types
import { DrawerProps } from "./types"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

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
    if (mask) {
      if (isActive !== localActive) {
        if (isActive) {
          setLocalActive(true)
          setLocalMask(true)
        } else {
          setTimeout(() => {
            setLocalActive(false)
          }, 100)
          setLocalMask(false)
        }
      }
    }
  }, [mask, localActive, isActive])
  const correctIsActive = (mask && localActive) || isActive

  //Calculating animation depending on the position and from prop
  if (!from) {
    from = position
  }
  const xPosition = {
    initial:
      from == "left" || from == "left-top" || from == "left-bottom"
        ? -300
        : undefined,
    animated:
      from == "left" || from == "left-top" || from == "left-bottom"
        ? 0
        : undefined
  }
  const yPosition = {
    initial:
      from == "top" || from == "left-top" || from == "right-top"
        ? -300
        : undefined,
    animated:
      from == "top" || from == "left-top" || from == "right-top" ? 0 : undefined
  }

  return createPortal(
    <AnimatePresence mode="popLayout">
      {isActive && (
        <PopupContainer
          style={{
            minWidth: position == "top" || position == "bottom" ? "100%" : "",
            maxWidth: position == "top" || position == "bottom" ? "100%" : "",
            minHeight: position == "left" || position == "right" ? "100%" : "",
            maxHeight: position == "left" || position == "right" ? "100%" : "",
            top: position == "bottom" ? undefined : 0,
            bottom: position == "bottom" ? 0 : undefined,
            left: position == "right" ? undefined : 0,
            right: position == "right" ? 0 : undefined
          }}
          animationProps={{
            initial: { x: xPosition.initial, y: yPosition.initial, scale: 0.5 },
            animate: {
              x: xPosition.animated,
              y: yPosition.animated,
              scale: 1.5
            },
            exit: { x: xPosition.initial, y: yPosition.initial, scale: 0.5 },
            transition: { duration: 0.8, bounce: 0 }
          }}
          className={clsx(
            styles["drawer-popup-wrapper"],
            popupWrapperClassName
          )}
          isActive={isActive}
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
