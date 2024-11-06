// System
import clsx from "clsx"
// Styles and types
import { DividerProps } from "./types"
import styles from "./styles.module.scss"
import { addGap } from "@/ui/Layout/Gaper"

/**
 * A functional component that renders a divider.
 *
 * @param {React.ReactNode} props.children - Optional content to display alongside the divider.
 * @param {string} [props.className] - Additional class names to apply to the divider.
 * @param {string} [props.orientation="horizontal"] - The orientation of the divider, either "horizontal" or "vertical".
 * @param {string} [props.gap="no"] - The gap size around the divider.
 * @param {string} [props.bottomGap] - The gap size at the bottom of the divider.
 *
 */
function Divider({
  className,
  orientation = "horizontal",
  gap = "same",
  bottomGap
}: DividerProps) {
  const calculatedClassNames = clsx(
    styles["divider"],
    className,
    styles[orientation],
    addGap(
      undefined,
      orientation == "horizontal" ? bottomGap || gap : undefined,
      orientation == "horizontal" ? gap : undefined,
      orientation == "horizontal" ? gap : undefined,
      orientation == "vertical" ? bottomGap || gap : undefined
    )
  )
  return <hr className={calculatedClassNames} />
}
export default Divider
