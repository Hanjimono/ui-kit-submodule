import type { Meta, StoryObj } from "@storybook/react"
import Tag from "./index"

const meta: Meta<typeof Tag> = {
  title: "UI/Presentation/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tag renders a tag with optional close button, color, size, and tooltip for overflow."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    title: { control: "text" },
    color: { control: "text" },
    maxWidth: { control: "number" },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"]
    },
    borderless: { control: "boolean" },
    onClose: { action: "closed" },
    value: { control: "text" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: {
    title: "Default Tag",
    onClose: undefined
  }
}

export const Colored: Story = {
  args: {
    title: "Colored Tag",
    color: "#38bdf8",
    onClose: undefined
  }
}

export const WithCloseButton: Story = {
  args: {
    title: "Closable Tag",
    onClose: () => {},
    value: "Closable Tag"
  }
}

export const Small: Story = {
  args: {
    title: "Small Tag",
    size: "small",
    onClose: undefined
  }
}

export const Large: Story = {
  args: {
    title: "Large Tag",
    size: "large",
    onClose: undefined
  }
}

export const OverflowTooltip: Story = {
  args: {
    title:
      "This is a very long tag that should show a tooltip when overflowing.",
    maxWidth: 100,
    onClose: undefined
  }
}
