type AvailableSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type AvailableOffsetSizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
export interface PillarProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Number of columns for xs format */
  xs?: AvailableSizes | boolean
  /** Number of columns for sm format */
  sm?: AvailableSizes | boolean
  /** Number of columns for md format */
  md?: AvailableSizes | boolean
  /** Number of columns for lg format */
  lg?: AvailableSizes | boolean
  /** Offset number of columns for xs format */
  xsOffset?: AvailableOffsetSizes | boolean
  /** Offset number of columns for sm format */
  smOffset?: AvailableOffsetSizes | boolean
  /** Offset number of columns for md format */
  mdOffset?: AvailableOffsetSizes | boolean
  /** Offset number of columns for lg format */
  lgOffset?: AvailableOffsetSizes | boolean
  /** Removes margin from sides */
  withoutMargin?: boolean
  /** Content will take all allowed space */
  grow?: boolean
}
