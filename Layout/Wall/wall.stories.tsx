import type { Meta, StoryObj } from "@storybook/react"
import Wall from "./index"
import Brick from "../Brick"

const meta: Meta<typeof Wall> = {
  title: "UI/Layout/Wall",
  component: Wall,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Wall is a container with responsive paddings and centering. Bricks inside demonstrate the padding visually."
      }
    }
  },
  argTypes: {
    isShortYPadding: { control: "boolean" },
    isOnlyXPadding: { control: "boolean" },
    className: { control: "text" },
    children: { control: false }
  },
  tags: ["autodocs"]
}
export default meta
type Story = StoryObj<typeof Wall>

export const Default: Story = {
  args: {
    className: "bg-blue-50 border border-blue-200",
    children: <Brick>Default Wall (responsive paddings)</Brick>
  }
}

export const ShortYPadding: Story = {
  args: {
    className: "bg-blue-50 border border-blue-200",
    isShortYPadding: true,
    children: <Brick>Short Y Padding</Brick>
  }
}

export const OnlyXPadding: Story = {
  args: {
    className: "bg-blue-50 border border-blue-200",
    isOnlyXPadding: true,
    children: <Brick>Only X Padding</Brick>
  }
}
