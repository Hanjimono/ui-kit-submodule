// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
// Styles and types
import { SpacerProps } from "./types"

/**
 * Spacer component that expands to fill available space within a flex container.
 *
 * @param className - Additional CSS class names to apply to the spacer.
 * @returns A div element with flex-grow styling to act as a flexible spacer.
 */
function Spacer({ className }: SpacerProps) {
  const calculatedClassNames = cx(twMerge("spacer flex-grow", className))
  return <div className={calculatedClassNames} />
}
export default Spacer
