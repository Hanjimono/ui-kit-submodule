import { FoundationProps } from "./types"
import clsx from "clsx"
import styles from "./styles.module.scss"

/** Basic root component, that will take all available screen space in absolute way */
function Foundation({ children, className }: FoundationProps) {
  const calculatedClassNames = clsx(styles["foundation"], className)
  return <div className={calculatedClassNames}>{children}</div>
}
export default Foundation
