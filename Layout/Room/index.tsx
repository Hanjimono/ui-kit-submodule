// System
import { AnimatePresence, motion } from "framer-motion"
// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
// Styles and types
import { HiddenRoomProps, RoomProps } from "./types"

const BASIC_ROOM_CLASS = "room flex flex-col relative"

/**
 * Room component that wraps its children with a motion div and applies conditional class names.
 * It's used to create a group of elements, that usually represent a some section of the page.
 * If part of the page will disappear or appear, the Room component will apply layout animation.
 * Elements inside the same Room can be buggy on the disappearing animation.
 * So, better use a different Rooms for disappearing elements and rest page even if it's logically the same section.
 *
 * @param {RoomProps} props - The properties for the Room component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the Room component.
 * @param {string} [props.className] - Additional class names to be applied to the Room component.
 *
 * @returns {JSX.Element} The rendered Room component.
 */
function Room({ children, className }: RoomProps) {
  const calculatedClassNames = formatClassnames(BASIC_ROOM_CLASS, className)
  return (
    <motion.div layout className={calculatedClassNames}>
      {children}
    </motion.div>
  )
}

/**
 * Hidden Room - component that conditionally renders its children with animation.
 * The animation is absolute, so make sure to use it in a container with `position: relative` (i.e. Room component).
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the hidden room.
 * @param {string} [props.className] - Additional class names to apply to the hidden room.
 * @param {boolean} [props.isShown=true] - Flag to determine whether the hidden room should be shown.
 * @param {string} [props.mode="popLayout"] - The animation mode for the hidden room.
 *
 * @returns {JSX.Element} The animated hidden room containing the children if `isShown` is true.
 */
export function HiddenRoom({
  children,
  className,
  isShown = true,
  mode = "popLayout"
}: HiddenRoomProps) {
  const calculatedClassNames = formatClassnames(
    "room",
    BASIC_ROOM_CLASS,
    className
  )
  return (
    <AnimatePresence mode={mode}>
      {isShown && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className={calculatedClassNames}
          layout
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Room
