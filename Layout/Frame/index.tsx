// System
import clsx from "clsx"
// Styles and types
import { FrameProps } from "./types"
import styles from "./styles.module.scss"

function Frame({ children, className }: FrameProps) {
  const calculatedClassNames = clsx(styles["frame"], className)
  return <div className={calculatedClassNames}>{children}</div>
}
export default Frame
