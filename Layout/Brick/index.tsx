// System
import clsx from "clsx"
// Ui
import { addGap } from "../Gaper"
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
 * @param {boolean} [noPadding] - If true, removes padding from the `div`.
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
  whole,
  noPadding
}: BrickProps) {
  const calculatedClassNames = clsx(
    styles["brick"],
    className,
    !!flex && styles["flex"],
    !!square && styles["square"],
    !!whole && styles["whole"],
    styles[`durability-${durability}`],
    !!noPadding && styles["no-padding"],
    addGap("same", bottomGap === true ? "other-level" : bottomGap)
  )
  return <div className={calculatedClassNames}>{children}</div>
}
export default Brick
