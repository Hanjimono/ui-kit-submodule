import { Gap } from "@/ui/Layout/Gaper/types"

/** Basic row component in layout */
export interface BeamProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Content do not wrap */
  withoutWrap?: boolean
  /** Content will take all allowed height */
  whole?: boolean
  /** Align content */
  contentJustify?: "start" | "center" | "end" | "between" | "around"
  /** Align content for vertical */
  contentAlign?: "start" | "center" | "end"
}
