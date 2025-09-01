/** Possible gap variants for the layout components */
export type PossibleGapVariants =
  | "none"
  | "tight"
  | "close"
  | "same-level-close"
  | "same-level"
  | "distant"
  | "extra-distant"

/** Props for the Stack component */
export interface StackProps {
  /** React children */
  children?: React.ReactNode
  /** A custom class name for the stack container */
  className?: string
  /** The gap between stack items */
  gap?: PossibleGapVariants
  /** Whether the stack items should wrap to the next line */
  isWrap?: boolean
}
