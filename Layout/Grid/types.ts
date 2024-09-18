import React from "react"
type AvailableSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type AvailableOffsetSizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
export interface GridRowStyledProps {
  noSpacing?: boolean
  box?: boolean
}
export interface GridItemStyledProps {
  xsSize: AvailableSizes
  smSize: AvailableSizes
  mdSize: AvailableSizes
  lgSize: AvailableSizes
  xsOffset: AvailableOffsetSizes
  smOffset: AvailableOffsetSizes
  mdOffset: AvailableOffsetSizes
  lgOffset: AvailableOffsetSizes
  noSpacing?: boolean
  container?: boolean
}

export interface GridProps {
  /** React children */
  children: React.ReactNode
  /** Grid row which contain grid items  */
  row?: boolean
  /** Grid basic item  */
  item?: boolean
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
  /** Remove margin and padding */
  noSpacing?: boolean
  /** Grid takes all available height */
  container?: boolean
}

export interface StyleSettingsInterface {
  basicSpacing: string
  smViewport: string
  mdViewport: string
  lgViewport: string
}
