// System
import clsx from "clsx"
// Types and styles
import { DecoratedWallProps, WallProps } from "./types"
import styles from "./styles.module.scss"
import ContentAppearTransition from "@/ui/Navigation/ContentTransition"

/**
 * Basic container component. It has a defined width and centers its content.
 *
 * @param {WallProps} props - The properties for the Wall component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the Wall component.
 * @param {string} [props.className] - Additional class names to be applied to the Wall component.
 * @returns {JSX.Element} The rendered Wall component.
 */
function Wall({ children, className }: WallProps) {
  const calculatedClassNames = clsx(styles["wall"], className)
  return <div className={calculatedClassNames}>{children}</div>
}

/**
 * A component that wraps the `Wall` component with optional animation and additional styling.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the wall.
 * @param {string} className - Additional class names to apply to the wall.
 * @param {string} [animationMode="default"] - The mode of animation to apply. Can be "default", "simple", or "none".
 * @param {string} transitionClassName - Class name to apply to the transition component.
 *
 * @returns {JSX.Element} The decorated wall component with optional animation.
 */
export function DecoratedWall({
  children,
  className,
  animationMode = "default",
  transitionClassName
}: DecoratedWallProps) {
  if (animationMode === "none") {
    return Wall({ children, className })
  }
  const calculatedClassNames = clsx(styles["decorated-wall"], className)
  return (
    <ContentAppearTransition
      className={transitionClassName}
      simple={animationMode === "simple"}
    >
      <Wall className={calculatedClassNames}>{children}</Wall>
    </ContentAppearTransition>
  )
}

export default Wall
