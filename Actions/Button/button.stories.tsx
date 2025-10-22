import type { Meta, StoryObj } from "@storybook/react"
import Button from "./index"

const meta: Meta<typeof Button> = {
  title: "UI/Actions/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button component that supports various themes, states, and icons."
      }
    }
  },
  argTypes: {
    onClick: { action: "clicked" },
    icon: { control: "text" },
    isLoading: { control: "boolean" },
    transparent: { control: "boolean" },
    isText: { control: "boolean" },
    isWide: { control: "boolean" },
    isCustomSize: { control: "boolean" },
    isNoPadding: { control: "boolean" },
    isSmall: { control: "boolean" },
    disabled: { control: "boolean" },
    primary: { control: "boolean" },
    secondary: { control: "boolean" },
    tool: { control: "boolean" },
    light: { control: "boolean" },
    remove: { control: "boolean" }
  },
  tags: ["autodocs"]
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: "Primary",
    primary: true
  }
}
export const Secondary: Story = {
  args: {
    children: "Secondary",
    secondary: true
  }
}
export const Transparent: Story = {
  args: {
    children: "Transparent",
    transparent: true
  }
}
export const Tool: Story = {
  args: {
    children: "Tool",
    tool: true
  }
}
export const Light: Story = {
  args: {
    children: "Light",
    light: true
  }
}
export const Remove: Story = {
  args: {
    children: "Remove",
    remove: true
  }
}
export const WithIcon: Story = {
  args: {
    children: "With Icon",
    icon: "star" // Replace with your icon name
  }
}
export const Loading: Story = {
  args: {
    children: "Loading",
    isLoading: true
  }
}
export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true
  }
}
