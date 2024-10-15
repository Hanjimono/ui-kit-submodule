type AvailableSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type AvailableOffsetSizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

/** Pillar component is a flexible layout component that allows for responsive
 * column sizing and offsetting.
 */
export interface PillarProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Number of columns for xs format (portrait phones, less than 576px)*/
  xs?: AvailableSizes | boolean
  /** Number of columns for sm format (landscape phones, 576px and up)*/
  sm?: AvailableSizes | boolean
  /** Number of columns for md format (tablets, 768px and up) */
  md?: AvailableSizes | boolean
  /** Number of columns for lg format (desktops, 992px and up) */
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
