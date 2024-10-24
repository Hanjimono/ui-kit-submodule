/** ContentAppearTransition component provides a smooth transition effect for its children */
export interface ContentAppearTransitionProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Remove "fancy" animations and keeps just opacity change */
  simple?: boolean
}
