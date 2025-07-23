// System
import { cva } from "class-variance-authority"
// Ui
import Button from "@/ui/Actions/Button"
import Text from "@/ui/Presentation/Text"
import Title from "@/ui/Presentation/Title"
import { smartCvaWrapper } from "@/ui/Skeleton/utils"
// Types and styles
import { NoteProps } from "./types"

/**
 * Note component renders a styled note with optional title and close button.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the note.
 * @param {string} [props.className] - Additional class names to apply to the note.
 * @param {string} [props.type="info"] - The type of the note, which determines its styling. Default is "info".
 * @param {() => void} [props.onClose] - Callback function to be called when the close button is clicked.
 * @param {string} [props.title] - Optional title to be displayed at the top of the note.
 *
 * @returns {JSX.Element} The rendered Note component.
 */
function Note({
  children,
  className,
  type = "info",
  onClose,
  title
}: NoteProps) {
  const calculatedClassNames = smartCvaWrapper(
    noteStyles,
    {
      type
    },
    className
  )
  return (
    <div className={calculatedClassNames}>
      {!!onClose && (
        <Button
          className={"absolute top-1 right-1 text-inherit"}
          onClick={onClose}
          text
          icon="close"
          iconType="md"
          iconSize={24}
        />
      )}
      {!!title && <Title size={6}>{title}</Title>}
      <Text type="plain">{children}</Text>
    </div>
  )
}

const noteStyles = cva("note p-4 rounded-2xl relative", {
  variants: {
    type: {
      info: "bg-block-400 text-white",
      success: "bg-success-main text-slate-800",
      warning: "bg-remove-main text-slate-800"
    }
  }
})

export default Note
