import type { Meta, StoryObj } from "@storybook/react"
import Divider from "./index"

const meta: Meta<typeof Divider> = {
  title: "UI/Presentation/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Divider renders a horizontal or vertical line to separate content. Supports orientation and custom styling."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"]
    }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    className: "w-64"
  }
}

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-64"
  }
}
