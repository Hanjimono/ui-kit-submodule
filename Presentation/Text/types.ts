// Define the possible types of text styles
export type TextType = "plain" | "paragraph" | "fit-line"

// Define the possible sizes of text
export type TextSize = "default" | "small" | "extra-small" | "large"

/** Basic text component */
export interface TextProps {
  /** React children to be rendered inside the text component */
  children?: React.ReactNode
  /** Additional CSS classes for styling the text component */
  className?: string
  /**
   * Specifies the type of text:
   * - "plain" is the default span text
   * - "paragraph" is a "p" tag with padding
   * - "fit-line" will truncate the text that doesn't fit in the parent container
   */
  type?: TextType
  /** Specifies the size of the text */
  size?: TextSize
  /** If true, renders the text in bold */
  bold?: boolean
  /** If true, renders the text in semibold */
  semibold?: boolean
  /** If true, renders the text in italic */
  italic?: boolean
  /** If true, renders the text while clipping part that doesn't fit */
  clip?: boolean
}
