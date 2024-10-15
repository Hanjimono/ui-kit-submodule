// System
import clsx from "clsx"
// Ui
import Button from "@/ui/Actions/Button"
import Text from "@/ui/Presentation/Text"
import Title from "@/ui/Presentation/Title"
// Types and styles
import { NoteProps } from "./types"
import styles from "./styles.module.scss"

/**
 * Note component renders a styled note with optional title and close button.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the note.
 * @param {string} [props.className] - Additional class names to apply to the note.
 * @param {string} [props.type="info"] - The type of the note, which determines its styling. Default is "info".
 * @param {() => void} [props.onClose] - Callback function to be called when the close button is clicked.
 * @param {boolean} [props.withoutMargin] - If true, removes the margin from the note.
 * @param {string} [props.title] - Optional title to be displayed at the top of the note.
 *
 * @returns {JSX.Element} The rendered Note component.
 */
function Note({
  children,
  className,
  type = "info",
  onClose,
  withoutMargin,
  title
}: NoteProps) {
  const calculatedClassNames = clsx(
    styles["note"],
    styles[type],
    !!withoutMargin && styles["without-margin"],
    className
  )
  return (
    <div className={calculatedClassNames}>
      {!!onClose && (
        <Button
          className={styles["close-button"]}
          onClick={onClose}
          text
          icon="close"
          iconType="md"
          iconSize={24}
        />
      )}
      {!!title && (
        <Title size={6} className={styles["title"]}>
          {title}
        </Title>
      )}
      <Text type="plain">{children}</Text>
    </div>
  )
}
export default Note
