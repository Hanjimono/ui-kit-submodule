// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
// Types and styles
import { PillarProps } from "./types"

/**
 * Pillar component is a flexible layout component that allows for responsive
 * column sizing and offsetting. It accepts various props to control the size
 * and offset of the column at different breakpoints.
 * Basically, it is a column in a grid system, very similar to the Bootstrap col component.
 * !Important! It's better to use default `span` and `offset` OR responsive, not both together.
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
 * @param {number} [span] - Number of columns for default format.
 * @param {number} [offset] - Offset number of columns for default format.
 *
 * @returns {JSX.Element} The rendered Pillar component.
 */
function Pillar({
  children,
  className,
  md,
  sm,
  lg,
  xl,
  smOffset,
  mdOffset,
  lgOffset,
  xlOffset,
  isGrow,
  span,
  offset
}: PillarProps) {
  const defaultMaxSpan = span || lg || md || sm || 12
  const defaultMinSpan = sm || md || lg || 12
  const defaultOffset = offset || 0
  const calculatedClassNames = formatClassnames(
    "pillar grow-0 flex-shrink-1 flex-basis-auto col-span",
    !!isGrow && "flex-grow-1 max-w-full",
    className
  )

  const styles: React.CSSProperties & Record<string, string | number> = {
    "--grid-span": defaultMaxSpan,
    "--grid-span-sm": defaultMinSpan,
    "--grid-offset": defaultOffset
  }
  if (md) {
    styles["--grid-span-md"] = md
  }
  if (lg) {
    styles["--grid-span-lg"] = lg
  }
  if (xl) {
    styles["--grid-span-xl"] = xl
  }
  if (smOffset) {
    styles["--grid-offset-sm"] = smOffset
  }
  if (mdOffset) {
    styles["--grid-offset-md"] = mdOffset
  }
  if (lgOffset) {
    styles["--grid-offset-lg"] = lgOffset
  }
  if (xlOffset) {
    styles["--grid-offset-xl"] = xlOffset
  }
  return (
    <div style={styles} className={calculatedClassNames}>
      {children}
    </div>
  )
}
export default Pillar
