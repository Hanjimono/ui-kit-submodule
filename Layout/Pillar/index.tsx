import { PillarProps } from "./types"
import clsx from "clsx"
import styles from "./styles.module.scss"

function Pillar({
  children,
  className,
  xs,
  md,
  sm,
  lg,
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  grow
}: PillarProps) {
  const calculatedClassNames = clsx(
    styles["pillar"],
    className,
    !!xs && styles["pillar-xs-" + xs],
    !!sm && styles["pillar-sm-" + sm],
    !!md && styles["pillar-md-" + md],
    !!lg && styles["pillar-lg-" + lg],
    !!xsOffset && styles["pillar-xs-offset-" + xsOffset],
    !!smOffset && styles["pillar-sm-offset-" + smOffset],
    !!mdOffset && styles["pillar-md-offset-" + mdOffset],
    !!lgOffset && styles["pillar-lg-offset-" + lgOffset],
    grow && styles["pillar-grow"]
  )
  return <div className={calculatedClassNames}>{children}</div>
}
export default Pillar
