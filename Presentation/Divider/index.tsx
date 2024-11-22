// System
import { cva } from "class-variance-authority"
import { smartCvaWrapper } from "@/ui/Skeleton/utils"
// Ui
import { addGap } from "@/ui/Layout/Gaper"
// Styles and types
import { DividerProps } from "./types"

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
  const calculatedClassNames = smartCvaWrapper(
    dividerStyles,
    { orientation },
    className,
    addGap(
      undefined,
      orientation == "horizontal" ? bottomGap || gap : undefined,
      orientation == "horizontal" ? gap : undefined,
      orientation == "vertical" ? gap : undefined,
      orientation == "vertical" ? bottomGap || gap : undefined
    )
  )
  return <hr className={calculatedClassNames} />
}

const dividerStyles = cva("divider opacity-50 p-0 m-0 border-0", {
  variants: {
    orientation: {
      horizontal: "w-full border-b border-b-gray-500",
      vertical: "h-full border-l border-l-gray-500"
    }
  }
})

export default Divider
