/** Renders a panel containing tabs. Tab changing event is handled by the parent component. */
export interface TabPanelProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Index of the active tab */
  activeTabIdx?: number
  /** Callback for changing the active tab */
  onTabChange?: (tabIdx: number) => void
  /** List of tab names. You can render tabs with a Tab component or use this list to render them via simple list of names. */
  tabsList?: string[]
}

/** Renders a single tab. */
export interface TabProps {
  /** Tab index */
  idx: number
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Is the tab active */
  isActive?: boolean
  /** Callback for changing the active tab */
  onTabChange?: (tabIdx: number) => void
}
