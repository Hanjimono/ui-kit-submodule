// System
import { cva } from "class-variance-authority"
import { smartCvaWrapper } from "@/ui/Skeleton/utils"
// Styles and types
import { DividerProps } from "./types"

/**
 * A functional component that renders a divider.
 *
 * @param {React.ReactNode} props.children - Optional content to display alongside the divider.
 * @param {string} [props.className] - Additional class names to apply to the divider.
 * @param {string} [props.orientation="horizontal"] - The orientation of the divider, either "horizontal" or "vertical".
 * @param {string} [props.gap="no"] - The gap size around the divider.
 *
 */
function Divider({ className, orientation = "horizontal" }: DividerProps) {
  const calculatedClassNames = smartCvaWrapper(
    dividerStyles,
    { orientation },
    className
  )
  return <hr className={calculatedClassNames} />
}

const dividerStyles = cva("divider opacity-50 p-0 m-0 border-0", {
  variants: {
    orientation: {
      horizontal: "w-full border-b border-b-form-border",
      vertical: "h-full border-l border-l-form-border"
    }
  }
})

export default Divider
