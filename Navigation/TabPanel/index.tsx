// System
import React from "react"
// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
// Styles and types
import { TabPanelProps, TabProps } from "./types"
import Button from "@/ui/Actions/Button"
import Inline from "@/ui/Layout/Inline"

/** Renders a panel containing tabs. Tab changing event is handled by the parent component. */
/**
 * TabPanel component renders a panel with tabs.
 * It enhances the children elements by passing additional props if they are of type `Tab`.
 * You can also pass a list of tab names to be rendered as tabs.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the TabPanel.
 * @param {string} [props.className] - Additional class names to apply to the TabPanel.
 * @param {number} [props.activeTabIdx] - The index of the currently active tab.
 * @param {function} [props.onTabChange] - Callback function to handle tab change events.
 * @param {string[]} [props.tabsList] - List of tab names to be rendered.
 * @param {ThemeType} [props.theme] - Color theme for the tabs.
 * @param {ThemeType} [props.activeTabTheme] - Color theme for the active tab, if different from the rest.
 * @param {boolean} [props.isTransparent] - Makes the tab background transparent.
 * @param {boolean} [props.isNoBorder] - Removes the border on the bottom of the tab panel.
 * @param {boolean} [props.isNoButtonBorder] - Removes the border on the bottom of active tab button.
 *
 * @returns {JSX.Element} The rendered TabPanel component.
 */
export function TabPanel({
  children,
  className,
  activeTabIdx,
  onTabChange,
  tabsList,
  theme,
  activeTabTheme,
  isTransparent,
  isNoBorder,
  isNoButtonBorder,
  gap
}: TabPanelProps) {
  const calculatedClassNames = formatClassnames("tab-panel relative", className)
  let enhancedChildren = children
  if (!!children && (!!onTabChange || !!activeTabIdx || activeTabIdx === 0)) {
    enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Tab) {
        return React.cloneElement(child as React.ReactElement<TabProps>, {
          onTabChange,
          isActive: activeTabIdx === child.props.idx
        })
      }
      return child
    })
  }
  return (
    <Inline className={calculatedClassNames} gap={gap}>
      {tabsList &&
        tabsList.map((tabName, idx) => (
          <Tab
            key={idx}
            idx={idx}
            isActive={activeTabIdx === idx}
            onTabChange={() => onTabChange && onTabChange(idx)}
            theme={theme}
            activeTabTheme={activeTabTheme}
            isTransparent={isTransparent}
            isNoBorder={isNoButtonBorder}
          >
            {tabName}
          </Tab>
        ))}
      {enhancedChildren}
      {!isNoBorder && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-500" />
      )}
    </Inline>
  )
}

/**
 * Tab component represents a single tab in a tabbed navigation interface.
 *
 * @param {React.ReactNode} children - The content representing the tab. Usually a string title.
 * @param {string} className - Additional class names to apply to the tab.
 * @param {boolean} isActive - Indicates whether the tab is currently active.
 * @param {function} onTabChange - Callback function to handle tab change events.
 * @param {number} idx - The index of the tab.
 * @param {ThemeType} theme - Color theme for the tab.
 * @param {ThemeType} activeTabTheme - Color theme for the active tab, if different from the rest.
 * @param {boolean} isTransparent - Makes the tab background transparent.
 * @param {boolean} isNoBorder - Removes the border on the bottom of the tab.
 *
 * @returns {JSX.Element} The rendered tab component.
 */
export function Tab({
  children,
  className,
  isActive,
  onTabChange,
  idx,
  theme = "primary",
  activeTabTheme = "secondary",
  isTransparent = false,
  isNoBorder = false
}: TabProps) {
  const calculatedClassNames = formatClassnames(
    "group relative cursor-pointer no-underline rounded-t-lg rounded-b-none",
    className
  )
  return (
    <Button
      className={calculatedClassNames}
      onClick={onTabChange && !isActive ? () => onTabChange(idx) : undefined}
      theme={isActive ? activeTabTheme : theme}
      isText={isTransparent}
    >
      {children}
      {!isNoBorder && isActive && (
        <div className="z-1 absolute bottom-0 left-0 right-0 h-[1px] bg-gray-500 bg-primary-pressed" />
      )}
    </Button>
  )
}

export default TabPanel
