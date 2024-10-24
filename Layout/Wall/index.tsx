// System
import clsx from "clsx"
// Types and styles
import { DecoratedWallProps, WallProps } from "./types"
import styles from "./styles.module.scss"
import ContentAppearTransition from "@/ui/Skeleton/Transition/ContentAppearTransition"

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

export default Wall
