import { ThemeType } from "@/ui/Actions/Button/types"
import { InlineProps } from "@/ui/Layout/Inline/types"

/** Renders a panel containing tabs. Tab changing event is handled by the parent component. */
export interface TabPanelProps extends InlineProps {
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
  /** Color theme for the tabs */
  theme?: ThemeType
  /** Color theme for the active tab, if different from the rest */
  activeTabTheme?: ThemeType
  /** Makes the tab background transparent */
  isTransparent?: boolean
  /** Removes the border on the bottom of the tab panel */
  isNoBorder?: boolean
  /** Removes the border on the bottom of active tab button */
  isNoButtonBorder?: boolean
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
  /** Color theme for the tab */
  theme?: ThemeType
  /** Color theme for the active tab, if different from the rest */
  activeTabTheme?: ThemeType
  /** Makes the tab background transparent */
  isTransparent?: boolean
  /** Removes the border on the bottom of active tab button */
  isNoBorder?: boolean
}
