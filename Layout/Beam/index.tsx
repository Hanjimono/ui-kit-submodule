import { BeamProps } from "./types"
import clsx from "clsx"
import styles from "./styles.module.scss"

/** Basic row component in layout */
function Beam({
  children,
  className,
  withoutWrap,
  whole,
  bottomGap,
  withoutGap
}: BeamProps) {
  const calculatedClassNames = clsx(
    styles["beam"],
    className,
    !!withoutWrap && styles["no-wrap"],
    !!whole && styles["whole"],
    !!bottomGap && styles["bottom-gap"],
    !!withoutGap && styles["no-gap"]
  )
  return <div className={calculatedClassNames}>{children}</div>
}
export default Beam
