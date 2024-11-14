// System
import clsx from "clsx"
// Ui
import Brick from "@/ui/Layout/Brick"
import Title from "@/ui/Presentation/Title"
import Button from "@/ui/Actions/Button"
import Beam from "@/ui/Layout/Beam"
import Room from "@/ui/Layout/Room"
// Styles and types
import { ModalProps } from "./types"
import styles from "./styles.module.scss"

/**
 *
 * Modal component that renders a modal dialog with optional title and close button.
 *
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {string} [props.className] - Additional class names to apply to the modal.
 * @param {() => void} [props.onClose] - Callback function to be called when the close button is clicked.
 * @param {string} [props.title] - The title to be displayed at the top of the modal.
 *
 */
function Modal({ children, className, onClose, title }: ModalProps) {
  const calculatedClassNames = clsx(styles["modal"], className)
  return (
    <Brick className={calculatedClassNames} flex>
      {!!title && (
        <Room bottomGap>
          <Beam withoutWrap>
            {title && (
              <Title
                className={styles["modal-title"]}
                size={4}
                bottomGap="same"
              >
                {title}
              </Title>
            )}
          </Beam>
        </Room>
      )}
      {onClose && (
        <Button
          className={styles["close-button"]}
          onClick={onClose}
          icon="clear"
          text
        />
      )}
      {children}
    </Brick>
  )
}

export default Modal
