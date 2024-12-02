// System
import { AnimatePresence } from "framer-motion"
// Ui
import Portal from "@/ui/Skeleton/Portal"
import PopupContainer from "@/ui/Skeleton/PopupContainer"
// Styles and types
import { PopupContainerProps } from "@/ui/Skeleton/PopupContainer/types"

interface PortalPopupAppearTransitionProps
  extends Omit<PopupContainerProps, "animationProps"> {}

/**
 * Handles the appearance and disappearance of a popup with a transition animation.
 *
 * @param {boolean} isActive - Determines if the popup is active and should be displayed.
 * @param {React.ReactNode} children - The content to be displayed inside the popup.
 * @param {object} rest - Additional props to be passed to the PopupContainer.
 *
 * @returns {JSX.Element} The rendered PortalPopupAppearTransition component.
 */
export default function PortalPopupAppearTransition({
  isActive,
  children,
  ...rest
}: PortalPopupAppearTransitionProps) {
  return (
    <Portal>
      <AnimatePresence>
        {isActive && (
          <PopupContainer
            isActive={isActive}
            {...rest}
            animationProps={{
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.8, opacity: 0, pointerEvents: "none" },
              transition: { scale: { bounce: 0, duration: 0.2 } }
            }}
          >
            {children}
          </PopupContainer>
        )}
      </AnimatePresence>
    </Portal>
  )
}
