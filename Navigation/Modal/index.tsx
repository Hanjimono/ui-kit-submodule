// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
// Ui
import Brick from "@/ui/Layout/Brick"
import Title from "@/ui/Presentation/Title"
import Button from "@/ui/Actions/Button"
import Beam from "@/ui/Layout/Beam"
import Room from "@/ui/Layout/Room"
// Styles and types
import { ModalProps } from "./types"

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
  const calculatedClassNames = twMerge(
    cx("modal overflow-hidden relative", className)
  )
  return (
    <Brick className={calculatedClassNames} flex>
      {!!title && (
        <Room className="mb-same-level">
          <Beam withoutWrap>
            {title && (
              <Title
                className={"overflow-hidden text-ellipsis mb-same"}
                size={4}
              >
                {title}
              </Title>
            )}
          </Beam>
        </Room>
      )}
      {onClose && (
        <Button
          className={"absolute top-2 right-2"}
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
