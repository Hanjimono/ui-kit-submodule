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
  /** Add margin gap to the bottom */
  bottomGap?: boolean
  /** Remove margin gap inside component */
  withoutGap?: boolean
  /** Align content */
  contentJustify?: "start" | "center" | "end" | "between" | "around"
}
