import { TitleProps } from "./types"
import clsx from "clsx"
import styles from "./styles.module.scss"

/** Title typography for heading */
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
