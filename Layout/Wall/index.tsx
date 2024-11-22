// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
// Types and styles
import { WallProps } from "./types"

export const BASIC_WALL_CLASS =
  "wall flex flex-col container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 box-border overflow-visible"

/**
 * Basic container component. It has a defined width and centers its content.
 *
 * @param {WallProps} props - The properties for the Wall component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the Wall component.
 * @param {string} [props.className] - Additional class names to be applied to the Wall component.
 * @returns {JSX.Element} The rendered Wall component.
 */
function Wall({ children, className }: WallProps) {
  const calculatedClassNames = twMerge(cx(BASIC_WALL_CLASS, className))
  return <div className={calculatedClassNames}>{children}</div>
}

export default Wall
