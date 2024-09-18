import { BrickProps } from "./types"
import clsx from "clsx"
import styles from "./styles.module.scss"

function Brick({
  children,
  className,
  durability = 10,
  shadowless,
  flex,
  square,
  withMargin
}: BrickProps) {
  const calculatedClassNames = clsx(
    styles["brick"],
    className,
    !!shadowless && styles["shadowless"],
    !!flex && styles["flex"],
    !!square && styles["square"],
    !!withMargin && styles["with-margin"]
  )
  return <div className={calculatedClassNames}>{children}</div>
}
export default Brick
