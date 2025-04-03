// System
import React from "react"
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
// Styles and types
import { TabPanelProps, TabProps } from "./types"

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
 *
 * @returns {JSX.Element} The rendered TabPanel component.
 */
export function TabPanel({
  children,
  className,
  activeTabIdx,
  onTabChange,
  tabsList
}: TabPanelProps) {
  const calculatedClassNames = twMerge(cx("relative flex gap-4", className))
  let enhancedChildren = children
  if (!!children && (!!onTabChange || !!activeTabIdx || activeTabIdx === 0)) {
    enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Tab) {
        return React.cloneElement(child as React.ReactElement<TabProps>, {
          onTabChange,
          isActive: activeTabIdx === (child.props as TabProps).idx
        })
      }
      return child
    })
  }
  return (
    <div className={calculatedClassNames}>
      {tabsList &&
        tabsList.map((tabName, idx) => (
          <Tab
            key={idx}
            idx={idx}
            isActive={activeTabIdx === idx}
            onTabChange={() => onTabChange && onTabChange(idx)}
          >
            {tabName}
          </Tab>
        ))}
      {enhancedChildren}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-500" />
    </div>
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
 *
 * @returns {JSX.Element} The rendered tab component.
 */
export function Tab({
  children,
  className,
  isActive,
  onTabChange,
  idx
}: TabProps) {
  const calculatedClassNames = twMerge(
    cx(
      "group relative cursor-pointer p-4 no-underline hover:bg-primary-transparent  rounded-t-lg",
      className,
      isActive && "bg-primary-transparent border-b-primary-pressed"
    )
  )
  return (
    <div
      onClick={onTabChange && !isActive ? () => onTabChange(idx) : undefined}
      className={calculatedClassNames}
    >
      {children}
      <div
        className={twMerge(
          cx(
            "z-1 absolute bottom-0 left-0 right-0 h-[1px] bg-gray-500 group-hover:bg-primary-pressed",
            isActive && "bg-primary-pressed"
          )
        )}
      />
    </div>
  )
}

export default TabPanel
