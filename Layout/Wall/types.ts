/** Basic page component, that will take all available space. Uses flex-box */
export interface WallProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Using the shortest padding for Y axis */
  isShortYPadding?: boolean
}
