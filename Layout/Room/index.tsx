// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import { AnimatePresence, motion } from "framer-motion"
// ui
import { addGap } from "@/ui/Layout/Gaper"
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
 * @param {boolean} [props.bottomGap] - Flag to determine if the bottom gap class should be applied.
 * @param {boolean} [props.noGap] - Flag to determine if the gap class should be removed.
 *
 * @returns {JSX.Element} The rendered Room component.
 */
function Room({ children, className, bottomGap, noGap }: RoomProps) {
  const calculatedClassNames = twMerge(
    cx(
      BASIC_ROOM_CLASS,
      addGap(
        !!noGap ? "same" : "same-level",
        bottomGap === true ? "other-level" : bottomGap
      ),
      className
    )
  )
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
 * @param {boolean} [props.bottomGap] - Flag to determine if the bottom gap class should be applied.
 * @param {boolean} [props.noGap] - Flag to determine if the gap class should be removed.
 * @param {boolean} [props.isShown=true] - Flag to determine whether the hidden room should be shown.
 * @param {string} [props.mode="popLayout"] - The animation mode for the hidden room.
 *
 * @returns {JSX.Element} The animated hidden room containing the children if `isShown` is true.
 */
export function HiddenRoom({
  children,
  className,
  bottomGap,
  noGap,
  isShown = true,
  mode = "popLayout"
}: HiddenRoomProps) {
  const calculatedClassNames = twMerge(
    cx(
      "room",
      BASIC_ROOM_CLASS,
      addGap(
        !!noGap ? "same" : "same-level",
        bottomGap === true ? "other-level" : bottomGap
      ),
      className
    )
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
