export interface ModalProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Function to close the modal. If defined a close button will be displayed. */
  onClose?: () => void
  /** Modal title */
  title?: string
}
