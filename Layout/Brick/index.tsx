// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
// Styles and types
import { BrickDurability, BrickProps } from "./types"

const BRICK_COLORS: Record<BrickDurability, string> = {
  1: "bg-block-100",
  2: "bg-block-200",
  3: "bg-block-300",
  4: "bg-block-400",
  5: "bg-block-500",
  6: "bg-block-600",
  7: "bg-block-700",
  8: "bg-block-800",
  9: "bg-block-900"
}

/**
 * Basic block component. Renders a styled `div` element with various optional properties.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the `div`.
 * @param {string} [className] - Additional class names to apply to the `div`.
 * @param {number} [durability=0] - A number representing the durability level, which affects the applied styles. Higher numbers is more light.
 * @param {boolean} [flex] - If true, applies flexbox styling to the `div`.
 * @param {boolean} [square] - If true, it removes the border radius from the `div`.
 * @param {boolean} [whole] - If true, applies a whole width styling to the `div`.
 * @param {boolean} [noPadding] - If true, removes padding from the `div`.
 *
 * @returns {JSX.Element} A `div` element with the calculated class names and children.
 */
function Brick({
  children,
  className,
  durability = 5,
  flex,
  square,
  whole,
  noPadding,
  ...rest
}: BrickProps) {
  const calculatedClassNames = formatClassnames(
    "brick",
    BRICK_COLORS[durability],
    !!flex && "flex flex-col",
    !square && "rounded-2xl",
    !!whole && "w-full",
    !noPadding && "p-5",
    className
  )
  return (
    <div className={calculatedClassNames} {...rest}>
      {children}
    </div>
  )
}
export default Brick
