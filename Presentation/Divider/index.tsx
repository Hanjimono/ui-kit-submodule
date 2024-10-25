// System
import clsx from "clsx"
// Styles and types
import { DividerProps } from "./types"
import styles from "./styles.module.scss"

/**
 * A functional component that renders a divider.
 *
 * @param {React.ReactNode} props.children - Optional content to display alongside the divider.
 * @param {string} [props.className] - Additional class names to apply to the divider.
 * @param {string} [props.orientation="horizontal"] - The orientation of the divider, either "horizontal" or "vertical".
 * @param {string | boolean} [props.gap="no"] - The gap size around the divider. Can be "no", "small", "medium", "large", or a boolean where `true` is equivalent to "default".
 *
 */
function Divider({
  className,
  orientation = "horizontal",
  gap = "no"
}: DividerProps) {
  if (gap === true) gap = "default"
  const calculatedClassNames = clsx(
    styles["divider"],
    className,
    styles[orientation],
    styles["gap-" + gap]
  )
  return <hr className={calculatedClassNames} />
}
export default Divider
