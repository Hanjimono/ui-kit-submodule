// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
// Styles and types
import { InlineProps } from "./types"

/**
 * Renders a flex row container with customizable gap.
 * You can use predefined gap values to control the spacing between items or
 * customize the gap using Tailwind CSS utilities and custom classes.
 *
 * @param {string} [props.className] - Additional CSS class names to apply to the container.
 * @param {'none' | 'tight' | 'close' | 'same-level-close' | 'same-level' | 'distant' | 'extra-distant'} [props.gap] - The spacing between child elements.
 */
function Inline({ children, className, gap = "same-level" }: InlineProps) {
  const calculatedClassNames = formatClassnames(
    className,
    "flex flex-row",
    gap == "none" && "gap-0",
    gap == "tight" && "gap-tight",
    gap == "close" && "gap-close",
    gap == "same-level-close" && "gap-same-level-close",
    gap == "same-level" && "gap-same-level",
    gap == "distant" && "gap-distant",
    gap == "extra-distant" && "gap-extra-distant"
  )
  return <div className={calculatedClassNames}>{children}</div>
}
export default Inline
