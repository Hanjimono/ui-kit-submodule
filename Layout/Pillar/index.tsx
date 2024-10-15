// System
import clsx from "clsx"
// Types and styles
import { PillarProps } from "./types"
import styles from "./styles.module.scss"

/**
 * Pillar component is a flexible layout component that allows for responsive
 * column sizing and offsetting. It accepts various props to control the size
 * and offset of the column at different breakpoints.
 * Basically, it is a column in a grid system, very similar to the Bootstrap col component.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the Pillar.
 * @param {string} [className] - Additional class names to apply to the Pillar.
 * @param {number} [xs] - Column size for extra small screens.
 * @param {number} [sm] - Column size for small screens.
 * @param {number} [md] - Column size for medium screens.
 * @param {number} [lg] - Column size for large screens.
 * @param {number} [xsOffset] - Column offset for extra small screens.
 * @param {number} [smOffset] - Column offset for small screens.
 * @param {number} [mdOffset] - Column offset for medium screens.
 * @param {number} [lgOffset] - Column offset for large screens.
 * @param {boolean} [grow] - If true, the Pillar will grow to fill available space.
 *
 * @returns {JSX.Element} The rendered Pillar component.
 */
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
