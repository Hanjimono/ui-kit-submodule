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
  /** Transform all letters to uppercase */
  uppercase?: boolean
  /** Set a text align */
  align?: Align
  /** Use light color variant */
  isLight?: boolean
  /** Use accent color variant */
  isAccent?: boolean
}
