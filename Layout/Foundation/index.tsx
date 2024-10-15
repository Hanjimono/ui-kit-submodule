// System
import clsx from "clsx"
// Types and styles
import { FoundationProps } from "./types"
import styles from "./styles.module.scss"

/**
 * Basic root component, that will take all available screen space in absolute way
 *
 * @param {FoundationProps} props - The properties for the Foundation component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the Foundation component.
 * @param {string} [props.className] - Additional class names to be applied to the Foundation component.
 * @returns {JSX.Element} The rendered Foundation component.
 */
function Foundation({ children, className }: FoundationProps) {
  const calculatedClassNames = clsx(styles["foundation"], className)
  return <div className={calculatedClassNames}>{children}</div>
}
export default Foundation
