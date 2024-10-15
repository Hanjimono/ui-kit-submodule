// System
import clsx from "clsx"
// Types and styles
import { TitleProps } from "./types"
import styles from "./styles.module.scss"

/**
 * A functional component that renders a title typography for heading with various customizable styles.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the title element.
 * @param {string} [props.className] - Additional class names to apply to the title element.
 * @param {number} [props.size=2] - The heading level (1-6) to be used for the title element.
 * @param {boolean} [props.withTopPadding] - If true, applies top padding to the title element.
 * @param {boolean} [props.noPadding] - If true, removes all padding from the title element.
 * @param {boolean} [props.uppercase] - If true, transforms the text to uppercase.
 * @param {string} [props.align="left"] - The text alignment for the title element.
 * @param {boolean} [props.halfPadding] - If true, applies half padding to the title element.
 *
 * @returns {JSX.Element} The rendered title element.
 */
function Title({
  children,
  className,
  size = 2,
  withTopPadding,
  noPadding,
  uppercase,
  align = "left",
  halfPadding
}: TitleProps) {
  const calculatedClassNames = clsx(
    styles["title"],
    className,
    !!noPadding && styles["no-padding"],
    !!!withTopPadding && styles["without-top-padding"],
    !!uppercase && styles["uppercase"],
    !!halfPadding && styles["half-padding"]
  )
  const Tag = `h${size}` as keyof JSX.IntrinsicElements
  return (
    <Tag style={{ textAlign: align }} className={calculatedClassNames}>
      {children}
    </Tag>
  )
}
export default Title
