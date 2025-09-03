// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
// Types and styles
import { WallProps } from "./types"

export const BASIC_WALL_CLASS =
  "wall flex flex-col container h-fit mx-auto px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 box-border overflow-visible"

export const SHORT_Y_WALL_CLASS = "py-8 md:py-8 lg:py-8 xl:py-8 2xl:py-8"
/**
 * Basic container component. It has a defined width and centers its content.
 *
 * @param {WallProps} props - The properties for the Wall component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the Wall component.
 * @param {string} [props.className] - Additional class names to be applied to the Wall component.
 * @param {boolean} [props.isShortYPadding] - If true, applies the shortest padding for the Y axis.
 * @param {boolean} [props.isOnlyXPadding] - If true, removes padding for the Y axis.
 * @returns {JSX.Element} The rendered Wall component.
 */
function Wall({
  children,
  className,
  isShortYPadding,
  isOnlyXPadding
}: WallProps) {
  const calculatedClassNames = formatClassnames(
    BASIC_WALL_CLASS,
    isShortYPadding && SHORT_Y_WALL_CLASS,
    isOnlyXPadding && "py-0",
    className
  )
  return <div className={calculatedClassNames}>{children}</div>
}

export default Wall
