// System
import clsx from "clsx"
// Styles and types
import { BrickProps } from "./types"
import styles from "./styles.module.scss"

/**
 * Basic block component. Renders a styled `div` element with various optional properties.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the `div`.
 * @param {string} [className] - Additional class names to apply to the `div`.
 * @param {number} [durability=0] - A number representing the durability level, which affects the applied styles. Higher numbers is more light.
 * @param {boolean} [flex] - If true, applies flexbox styling to the `div`.
 * @param {boolean} [square] - If true, it removes the border radius from the `div`.
 * @param {boolean} [bottomGap] - If true, applies a bottom margin to the `div`.
 * @param {boolean} [whole] - If true, applies a whole width styling to the `div`.
 *
 * @returns {JSX.Element} A `div` element with the calculated class names and children.
 */
function Brick({
  children,
  className,
  durability = 0,
  flex,
  square,
  bottomGap,
  whole
}: BrickProps) {
  const calculatedClassNames = clsx(
    styles["brick"],
    className,
    !!flex && styles["flex"],
    !!square && styles["square"],
    !!bottomGap && styles["bottom-margin"],
    !!whole && styles["whole"],
    styles[`durability-${durability}`]
  )
  return <div className={calculatedClassNames}>{children}</div>
}
export default Brick
