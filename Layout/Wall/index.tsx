import { WallProps } from "./types"
import clsx from "clsx"
import styles from "./styles.module.scss"

/** Basic page component, that will take all available space. Uses flex-box */
function Wall({ children, className }: WallProps) {
  const calculatedClassNames = clsx(styles["wall"], className)
  return <div className={calculatedClassNames}>{children}</div>
}
export default Wall
