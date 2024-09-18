// System
import clsx from "clsx"
// Ui
import Button from "@/ui/Actions/Button"
import Text from "@/ui/Presentation/Text"
import Title from "@/ui/Presentation/Title"
// Types and styles
import { NoteProps } from "./types"
import styles from "./styles.module.scss"

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
