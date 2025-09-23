// System
import { cva } from "class-variance-authority"
// Ui
import Button from "@/ui/Actions/Button"
import Text from "@/ui/Presentation/Text"
import Title from "@/ui/Presentation/Title"
import { smartCvaWrapper } from "@/ui/Skeleton/utils"
import Inline from "@/ui/Layout/Inline"
import Stack from "@/ui/Layout/Stack"
import Icon from "@/ui/Presentation/Icon"
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
 * @param {boolean} [props.isWithoutIcon=false] - Whether to display the icon or not. Default is false.
 *
 * @returns {JSX.Element} The rendered Note component.
 */
function Note({
  children,
  className,
  type = "info",
  onClose,
  title,
  isWithoutIcon = false
}: NoteProps) {
  const calculatedClassNames = smartCvaWrapper(
    noteStyles,
    {
      type
    },
    className
  )
  return (
    <Inline className={calculatedClassNames} gap="close">
      {!isWithoutIcon && (
        <Icon className="mt-1 text-tool-main" name="info" type="md" size={24} />
      )}
      {!!onClose && (
        <Button
          className={"absolute top-1 right-2 text-inherit"}
          onClick={onClose}
          isText
          icon="close"
          iconType="md"
          iconSize={24}
          tool
        />
      )}
      <Stack gap="close">
        {!!title && <Title size={6}>{title}</Title>}
        <Text type="plain">{children}</Text>
      </Stack>
    </Inline>
  )
}

const noteStyles = cva("note p-4 rounded-2xl relative", {
  variants: {
    type: {
      info: "bg-primary-main",
      success: "bg-success",
      warning: "bg-warning"
    }
  }
})

export default Note
