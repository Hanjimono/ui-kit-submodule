import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import TabPanel, { Tab } from "./index"

const meta: Meta<typeof TabPanel> = {
  title: "UI/Navigation/TabPanel",
  component: TabPanel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "TabPanel renders a panel with tabs, supporting custom themes, transparency, and border options."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    tabsList: { control: false },
    activeTabIdx: { control: false },
    onTabChange: { action: "tabChanged" },
    theme: { control: "text" },
    activeTabTheme: { control: "text" },
    isTransparent: { control: "boolean" },
    isNoBorder: { control: "boolean" },
    isNoButtonBorder: { control: "boolean" },
    gap: { control: "text" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof TabPanel>

const demoTabs = ["Home", "Profile", "Settings", "About"]

export const Default: Story = {
  render: (args) => {
    const [activeTabIdx, setActiveTabIdx] = useState(0)
    return (
      <TabPanel
        {...args}
        tabsList={demoTabs}
        activeTabIdx={activeTabIdx}
        onTabChange={setActiveTabIdx}
      />
    )
  },
  args: {}
}

export const TransparentTabs: Story = {
  render: (args) => {
    const [activeTabIdx, setActiveTabIdx] = useState(0)
    return (
      <TabPanel
        {...args}
        tabsList={demoTabs}
        activeTabIdx={activeTabIdx}
        onTabChange={setActiveTabIdx}
        isTransparent
      />
    )
  },
  args: {}
}

export const NoBorder: Story = {
  render: (args) => {
    const [activeTabIdx, setActiveTabIdx] = useState(0)
    return (
      <TabPanel
        {...args}
        tabsList={demoTabs}
        activeTabIdx={activeTabIdx}
        onTabChange={setActiveTabIdx}
        isNoBorder
      />
    )
  },
  args: {}
}

export const CustomThemes: Story = {
  render: (args) => {
    const [activeTabIdx, setActiveTabIdx] = useState(0)
    return (
      <TabPanel
        {...args}
        tabsList={demoTabs}
        activeTabIdx={activeTabIdx}
        onTabChange={setActiveTabIdx}
        theme="secondary"
        activeTabTheme="remove"
      />
    )
  },
  args: {}
}
