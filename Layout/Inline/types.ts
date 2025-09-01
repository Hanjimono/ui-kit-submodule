import { PossibleGapVariants } from "@/ui/Layout/Stack/types"

export interface InlineProps {
  /** React children */
  children?: React.ReactNode
  /** Additional class names */
  className?: string
  /** The gap between stack items */
  gap?: PossibleGapVariants
}
