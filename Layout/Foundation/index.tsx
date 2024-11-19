// System
import clsx from "clsx"
// Types and styles
import { FoundationProps } from "./types"

/**
 * Basic root component, that will take all available screen space in absolute way
 *
 * @param {FoundationProps} props - The properties for the Foundation component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the Foundation component.
 * @param {string} [props.className] - Additional class names to be applied to the Foundation component.
 * @returns {JSX.Element} The rendered Foundation component.
 */
function Foundation({ children, className }: FoundationProps) {
  const calculatedClassNames = clsx(
    "foundation",
    "absolute inset-0 w-full h-full overflow-hidden box-border bg-page",
    className
  )
  return <div className={calculatedClassNames}>{children}</div>
}
export default Foundation
