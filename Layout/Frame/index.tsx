// System
import clsx from "clsx"
// Styles and types
import { FrameProps } from "./types"
import styles from "./styles.module.scss"

/**
 * A component that wraps the main content of the page and add a scrollbar to the content.
 * It's a basic component that you should use in layouts to wrap the main content of the page.
 *
 * @param {FrameProps} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the frame.
 * @param {string} [props.className] - Additional class names to be applied to the frame.
 * @returns {JSX.Element} The rendered frame component.
 */
function Frame({ children, className }: FrameProps) {
  const calculatedClassNames = clsx(styles["frame"], className)
  return <div className={calculatedClassNames}>{children}</div>
}
export default Frame
