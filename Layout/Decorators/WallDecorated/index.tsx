// System
import clsx from "clsx"
// Ui
import ContentAppearTransition from "@/ui/Skeleton/Transition/ContentAppearTransition"
import Wall from "@/ui/Layout/Wall"
// Styles and types
import styles from "@/ui/Layout/Wall/styles.module.scss"
import { DecoratedWallProps } from "./types"

/**
 * A component that wraps the `Wall` component with optional animation and additional styling.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the wall.
 * @param {string} className - Additional class names to apply to the wall.
 * @param {AppearAnimationVariants | "none"} animationMode - The mode of animation to apply.
 *
 * @returns {JSX.Element} The decorated wall component with optional animation.
 */
export function WallDecorated({
  children,
  className,
  animationMode = "simple"
}: DecoratedWallProps) {
  if (animationMode === "none") {
    return Wall({ children, className })
  }
  const calculatedClassNames = clsx(styles["wall"], className)
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
