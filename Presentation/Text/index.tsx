// System
import clsx from "clsx"
// Types and styles
import { TextProps } from "./types"
import styles from "./styles.module.scss"

/**
 * A versatile Text component that allows for various text styles and HTML tags.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed within the text component.
 * @param {string} [props.className] - Additional class names to apply to the text component.
 * @param {boolean} [props.bold] - If true, applies bold styling to the text.
 * @param {boolean} [props.semibold] - If true, applies semibold styling to the text.
 * @param {boolean} [props.italic] - If true, applies italic styling to the text.
 * @param {string} [props.size] - The size of the text. Defaults to "default".
 * @param {string} [props.type] - The type of text. Defaults is plain.
 * @param {boolean} [props.clip] - If true, applies clipping styling to the text.
 *
 * @returns {JSX.Element} The styled text component.
 */
function Text({
  children,
  className,
  bold,
  semibold,
  italic,
  size,
  type,
  clip
}: TextProps) {
  const calculatedClassNames = clsx(
    styles["text"],
    className,
    !!semibold && styles["semibold"],
    !!bold && styles["bold"],
    !!italic && styles["italic"],
    !!size && size !== "default" && styles[size],
    !!type && styles[type],
    !!clip && styles["clip"]
  )
  const Tag =
    type == "paragraph" ? "p" : ("span" as keyof JSX.IntrinsicElements)
  return <Tag className={calculatedClassNames}>{children}</Tag>
}
export default Text
