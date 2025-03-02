// System
import { cva } from "class-variance-authority"
// Ui
import { smartCvaWrapper } from "@/ui/Skeleton/utils"
// Types and styles
import { TextProps } from "./types"

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
  const calculatedClassNames = smartCvaWrapper(
    textStyles,
    {
      size,
      style: { bold, semibold, italic, clip },
      type
    },
    className
  )
  const Tag =
    type == "paragraph" ? "p" : ("span" as keyof JSX.IntrinsicElements)
  return <Tag className={calculatedClassNames}>{children}</Tag>
}

const textStyles = cva("text text-base", {
  variants: {
    size: {
      default: "text-base",
      small: "text-sm",
      "extra-small": "text-xs",
      large: "text-lg"
    },
    style: {
      bold: "font-bold",
      semibold: "font-semibold",
      italic: "italic",
      clip: "overflow-hidden whitespace-nowrap"
    },
    type: {
      paragraph: "pb-6",
      "fit-line":
        "m-0 p-0 text-ellipsis whitespace-nowrap max-w-full inline-block overflow-hidden"
    }
  }
})

export default Text
