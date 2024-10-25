export interface ModalProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  onClose?: () => void
  title?: string
}
