// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
// Ui
import ContentAppearTransition from "@/ui/Skeleton/Transition/ContentAppearTransition"
import Wall, { BASIC_WALL_CLASS, SHORT_Y_WALL_CLASS } from "@/ui/Layout/Wall"
// Styles and types
import { DecoratedWallProps } from "./types"

/**
 * A component that wraps the `Wall` component with optional animation and additional styling.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the wall.
 * @param {string} className - Additional class names to apply to the wall.
 * @param {AppearAnimationVariants | "none"} animationMode - The mode of animation to apply.
 * @param {boolean} isShortYPadding - If true, applies a shorter padding on the Y-axis.
 *
 * @returns {JSX.Element} The decorated wall component with optional animation.
 */
export function WallDecorated({
  children,
  className,
  animationMode = "simple",
  isShortYPadding
}: DecoratedWallProps) {
  if (animationMode === "none") {
    return Wall({ children, className })
  }
  const calculatedClassNames = twMerge(
    cx(BASIC_WALL_CLASS, isShortYPadding && SHORT_Y_WALL_CLASS, className)
  )
  return (
    <ContentAppearTransition
      className={calculatedClassNames}
      animationVariant={animationMode}
    >
      {children}
    </ContentAppearTransition>
  )
}

export default WallDecorated
