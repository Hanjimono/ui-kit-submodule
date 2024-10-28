// System
import clsx from "clsx"
import { motion } from "framer-motion"
import { useEffect } from "react"
// Ui
import Note from "@/ui/Presentation/Note"
// Consts
import { AnimationVariants } from "./variants"
// Styles and types
import { SnackbarProps } from "./types"
import styles from "./styles.module.scss"

/**
 * Snackbar component displays a brief message at the bottom of the screen.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the Snackbar.
 * @param {string} className - Additional class names to style the Snackbar.
 * @param {() => void} onClose - Callback function to be called when the Snackbar is closed.
 * @param {"info" | "success" | "warning" | "critical"} type - Type of the Snackbar, which determines its styling.
 * @param {string} title - Title of the Snackbar.
 * @param {boolean} closable - Determines if the Snackbar can be closed by the user.
 * @param {boolean} isFirst - Indicates if this is the first Snackbar in a sequence. First snackbar play a special animation.
 * @param {number} duration - Duration in milliseconds for which the Snackbar is visible before closing automatically.
 *
 * @returns {JSX.Element} The rendered Snackbar component.
 */
function Snackbar({
  children,
  className,
  onClose,
  type,
  title,
  closable,
  isFirst,
  duration
}: SnackbarProps) {
  const calculatedClassNames = clsx(
    styles["snackbar"],
    className,
    type === "critical" && styles["critical"]
  )
  const noteType = type === "critical" ? "warning" : type
  useEffect(() => {
    if (closable && duration && onClose) {
      setTimeout(onClose, duration)
    }
  }, [closable, duration, onClose])
  return (
    <motion.div
      layout
      initial={isFirst ? "first" : "simple"}
      animate={"animated"}
      exit={isFirst ? "first" : "simple"}
      className={calculatedClassNames}
      onClick={closable ? onClose : undefined}
      variants={AnimationVariants}
    >
      <Note
        title={title}
        type={noteType}
        onClose={type === "critical" ? onClose : undefined}
      >
        {children}
      </Note>
    </motion.div>
  )
}
export default Snackbar
