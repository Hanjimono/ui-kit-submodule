import { TextSize } from "@/ui/Presentation/Text/types"

/**
 * A functional component that renders a tag with optional close button.
 */
export interface TagProps {
  /** Classes */
  className?: string
  /** Tag text */
  title: string
  /** Value related to the tag */
  value?: any
  /** Tag color */
  color?: string
  /** Tag size */
  size?: TextSize
  /** Function to be called when the tag close button is clicked */
  onClose?: (value?: any) => void
  /** Maximum width of the tag */
  maxWidth?: number
  /** Remove border from the tag */
  borderless?: boolean
}
