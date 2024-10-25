export interface ModalSkeletonProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Whether to display a mask behind the modal */
  withoutMask?: boolean
  /** If true, the modal cannot be closed by clicking outside of it */
  isNotClosable?: boolean
  /** Callback function to be called when the modal is requested to be closed */
  onClose?: () => void
}
