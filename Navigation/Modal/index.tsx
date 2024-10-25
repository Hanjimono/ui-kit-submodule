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

function Modal({ children, className, onClose, title }: ModalProps) {
  const calculatedClassNames = clsx(styles["Modal"], className)
  return (
    <Brick className={calculatedClassNames} flex>
      {(!!title || !!onClose) && (
        <Room>
          <Beam withoutWrap bottomGap>
            {title && (
              <Title size={4} noPadding>
                {title}
              </Title>
            )}
            {onClose && <Button onClick={onClose} icon="clear" text />}
          </Beam>
        </Room>
      )}
      <Room>
        <Beam>{children}</Beam>
      </Room>
    </Brick>
  )
}
export default Modal
