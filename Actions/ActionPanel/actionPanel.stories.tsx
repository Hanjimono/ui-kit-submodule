import type { Meta, StoryObj } from "@storybook/react"
import ActionPanel from "./index"

const meta: Meta<typeof ActionPanel> = {
  title: "UI/Actions/ActionPanel",
  component: ActionPanel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ActionPanel renders a panel with action buttons, supporting horizontal and vertical orientation. All buttons are icons and can have tooltips."
      }
    }
  },
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"]
    },
    isNoPadding: { control: "boolean" },
    gap: { control: "text" },
    items: { control: false },
    endItems: { control: false },
    className: { control: "text" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof ActionPanel>

const demoItems = [
  {
    icon: "star",
    title: "Star",
    onClick: () => {},
    className: "text-yellow-500"
  },
  {
    icon: "edit",
    title: "Edit",
    onClick: () => {},
    className: "text-blue-500"
  },
  {
    icon: "delete",
    title: "Delete",
    onClick: () => {},
    className: "text-red-500"
  }
]
const demoEndItems = [
  {
    icon: "settings",
    title: "Settings",
    onClick: () => {},
    className: "text-gray-500"
  }
]

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    items: demoItems
  }
}

export const HorizontalWithEndItems: Story = {
  args: {
    orientation: "horizontal",
    className: "w-64",
    items: demoItems,
    endItems: demoEndItems
  }
}

export const Vertical: Story = {
  args: {
    className: "h-64",
    orientation: "vertical",
    items: demoItems,
    endItems: demoEndItems,
    gap: "close"
  }
}
