// System
import React from "react"
import clsx from "clsx"
// Styles and types
import { TabPanelProps, TabProps } from "./types"
import styles from "./styles.module.scss"

/** Renders a panel containing tabs. Tab changing event is handled by the parent component. */
export function TabPanel({
  children,
  className,
  activeTabIdx,
  onTabChange,
  tabsList
}: TabPanelProps) {
  const calculatedClassNames = clsx(styles["tab-panel"], className)
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
      <hr />
    </div>
  )
}

/** Renders a single tab. */
export function Tab({
  children,
  className,
  isActive,
  onTabChange,
  idx
}: TabProps) {
  const calculatedClassNames = clsx(
    styles["tab"],
    className,
    isActive && styles["active"]
  )
  return (
    <div
      onClick={onTabChange && !isActive ? () => onTabChange(idx) : undefined}
      className={calculatedClassNames}
    >
      {children}
      <hr />
    </div>
  )
}

export default TabPanel
