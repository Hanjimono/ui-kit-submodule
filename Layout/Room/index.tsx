// System
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
// Styles and types
import { HiddenRoomProps, RoomProps } from "./types"
import styles from "./styles.module.scss"

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
  const calculatedClassNames = clsx(
    styles["room"],
    className,
    bottomGap && styles["bottom-gap"],
    noGap && styles["no-gap"]
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
 *
 * @returns {JSX.Element} The animated hidden room containing the children if `isShown` is true.
 */
export function HiddenRoom({
  children,
  className,
  bottomGap,
  noGap,
  isShown = true
}: HiddenRoomProps) {
  const calculatedClassNames = clsx(
    styles["room"],
    className,
    bottomGap && styles["bottom-gap"],
    noGap && styles["no-gap"]
  )
  return (
    <AnimatePresence mode="popLayout">
      {isShown && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className={calculatedClassNames}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Room
