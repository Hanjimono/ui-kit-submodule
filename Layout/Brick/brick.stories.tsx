import type { Meta, StoryObj } from "@storybook/react"
import Brick from "./index"

const meta: Meta<typeof Brick> = {
  title: "UI/Layout/Brick",
  component: Brick,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Basic block component. Renders a styled div element with various optional properties."
      }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    durability: {
      control: { type: "number", min: 1, max: 9 },
      defaultValue: 5
    },
    flex: { control: "boolean" },
    square: { control: "boolean" },
    whole: { control: "boolean" },
    noPadding: { control: "boolean" },
    className: { control: "text" },
    children: { control: "text" }
  },
  tags: ["autodocs"]
}
export default meta
type Story = StoryObj<typeof Brick>

export const Default: Story = {
  args: {
    children: "Default Brick"
  }
}

export const Square: Story = {
  args: {
    children: "Square Brick",
    square: true
  }
}

export const CustomDurability: Story = {
  args: {
    children: "Durability 9 Brick",
    durability: 9
  }
}
