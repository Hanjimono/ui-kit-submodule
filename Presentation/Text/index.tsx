import { TextProps } from "./types"
import clsx from "clsx"
import styles from "./styles.module.scss"

/** Basic text component */
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
