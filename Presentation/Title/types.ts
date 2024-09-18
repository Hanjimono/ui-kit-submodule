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
  /** Remove padding from top and bottom */
  noPadding?: boolean
  /** Adds padding from top same size as bottom */
  withTopPadding?: boolean
  /** Transform all letters to uppercase */
  uppercase?: boolean
  /** Set a text align */
  align?: Align
}
