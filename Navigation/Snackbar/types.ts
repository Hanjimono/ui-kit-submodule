export type SnackbarType = "info" | "success" | "warning" | "critical"

/** Snackbar component displays a brief message at the bottom of the screen. */
export interface SnackbarProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Title of the Snackbar */
  title?: string
  /** Type of the Snackbar, which determines its styling */
  type: SnackbarType
  /** Determines if the Snackbar can be closed by the user */
  closable?: boolean
  /** Callback function to be called when the Snackbar is closed */
  onClose?: () => void
  /** Indicates if this is the first Snackbar in a sequence. First snackbar play a special animation */
  isFirst?: boolean
  /** Duration in milliseconds for which the Snackbar is visible before closing automatically */
  duration?: number
}
