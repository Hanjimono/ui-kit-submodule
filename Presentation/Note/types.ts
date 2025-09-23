type NoteType = "info" | "success" | "warning"

/**
 * Note component render a text in a colored box with/without icon
 */
export interface NoteProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Different note types will change the color of the note */
  type?: NoteType
  /** Title will be displayed on the top of the note */
  title?: string
  /** Function to call when the close button is clicked */
  onClose?: () => void
  /** Whether to show the icon or not */
  isWithoutIcon?: boolean
}
