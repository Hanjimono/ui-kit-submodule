// System
import clsx from "clsx"
// Ui
import { addGap } from "@/ui/Layout/Gaper"
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
 * @param {Gap} [props.topGap] - The top margin gap to be applied to the title element.
 * @param {Gap} [props.bottomGap] - The bottom margin gap to be applied to the title element.
 * @param {boolean} [props.uppercase] - If true, transforms the text to uppercase.
 * @param {string} [props.align="left"] - The text alignment for the title element.
 *
 * @returns {JSX.Element} The rendered title element.
 */
function Title({
  children,
  className,
  size = 2,
  topGap,
  bottomGap = "same-level",
  uppercase,
  align = "left"
}: TitleProps) {
  const calculatedClassNames = clsx(
    styles["title"],
    className,
    !!uppercase && styles["uppercase"],
    addGap(undefined, bottomGap, topGap)
  )
  const Tag = `h${size}` as keyof JSX.IntrinsicElements
  return (
    <Tag style={{ textAlign: align }} className={calculatedClassNames}>
      {children}
    </Tag>
  )
}
export default Title
