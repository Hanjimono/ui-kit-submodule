import { Gap } from "@/ui/Layout/Gaper/types"

type TitleSize = 1 | 2 | 3 | 4 | 5 | 6

type Align = "left" | "right" | "center"

/** Title typography for heading */
export interface TitleProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Size of heading, default is 2 */
  size?: TitleSize
  /** Add margin to bottom */
  bottomGap?: Gap
  /** Add margin to top */
  topGap?: Gap
  /** Transform all letters to uppercase */
  uppercase?: boolean
  /** Set a text align */
  align?: Align
}
