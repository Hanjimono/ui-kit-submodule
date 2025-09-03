// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
// Styles and types
import { StackProps } from "./types"

/**
 * Stack component for laying out items with a customizable gap.
 * It's a flexible container that arranges its children in a column.
 * You can use predefined gap values to control the spacing between items or
 * customize the gap using Tailwind CSS utilities and custom classes.
 *
 * @param {string} className - A custom class name for the stack container
 * @param {'none' | 'tight' | 'close' | 'same-level-close' | 'same-level' | 'distant' | 'extra-distant'} [props.gap] - The spacing between child elements.
 * @param {boolean} [props.isWrap] - Whether the stack items should wrap to the next line.
 * @returns
 */
function Stack({
  className,
  gap = "same-level",
  children,
  isWrap
}: StackProps) {
  const calculatedClassNames = formatClassnames(
    "stack flex flex-col",
    className,
    gap == "none" && "gap-0",
    gap == "tight" && "gap-tight",
    gap == "close" && "gap-close",
    gap == "same-level-close" && "gap-same-level-close",
    gap == "same-level" && "gap-same-level",
    gap == "distant" && "gap-distant",
    gap == "extra-distant" && "gap-extra-distant",
    isWrap && "flex-wrap"
  )
  return <div className={calculatedClassNames}>{children}</div>
}

export default Stack
