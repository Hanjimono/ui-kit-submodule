import { PillarProps } from "./types"
import clsx from "clsx"
import styles from "./styles.module.scss"

function Pillar({ children, className }: PillarProps) {
  const calculatedClassNames = clsx(styles["pillar"], className)
  return <div className={calculatedClassNames}>{children}</div>
}
export default Pillar
