// System
import { cva } from "class-variance-authority"
// Ui
import { smartCvaWrapper } from "@/ui/Skeleton/utils"
// Types and styles
import { TitleProps } from "./types"

/**
 * A functional component that renders a title typography for heading with various customizable styles.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the title element.
 * @param {string} [props.className] - Additional class names to apply to the title element.
 * @param {number} [props.size=2] - The heading level (1-6) to be used for the title element.
 * @param {boolean} [props.uppercase] - If true, transforms the text to uppercase.
 * @param {string} [props.align="left"] - The text alignment for the title element.
 * @param {boolean} [props.isLight] - If true, applies light color variant to the text.
 * @param {boolean} [props.isAccent] - If true, applies accent color variant to the text.
 *
 * @returns {JSX.Element} The rendered title element.
 */
function Title({
  children,
  className,
  size = 2,
  uppercase,
  align = "left",
  isLight,
  isAccent
}: TitleProps) {
  const calculatedClassNames = smartCvaWrapper(
    titleStyles,
    {
      size,
      uppercase,
      color: isLight ? "light" : isAccent ? "accent" : "default"
    },
    className
  )
  const Tag = `h${size}` as keyof JSX.IntrinsicElements
  return (
    <Tag style={{ textAlign: align }} className={calculatedClassNames}>
      {children}
    </Tag>
  )
}

const titleStyles = cva("title text-title font-bold", {
  variants: {
    size: {
      1: "text-4xl",
      2: "text-3xl",
      3: "text-2xl",
      4: "text-xl",
      5: "text-lg",
      6: "text-base"
    },
    uppercase: {
      default: "uppercase",
      unset: ""
    },
    color: {
      default: "text-title",
      light: "text-light",
      accent: "text-accent"
    }
  }
})

export default Title
