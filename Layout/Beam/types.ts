/** Basic row component in layout */
export interface BeamProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Removes margin from sides */
  withoutMargin?: boolean
  /** Content do not wrap */
  withoutWrap?: boolean
  /** Content will take all allowed height */
  whole?: boolean
}
