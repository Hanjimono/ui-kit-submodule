import type { Meta, StoryObj } from "@storybook/react"
import Note from "./index"

const meta: Meta<typeof Note> = {
  title: "UI/Presentation/Note",
  component: Note,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Note renders a styled note with optional title and close button. Supports info, success, warning types, and custom styling."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["info", "success", "warning"]
    },
    title: { control: "text" },
    onClose: { action: "closed" },
    isWithoutIcon: { control: "boolean" },
    children: { control: "text" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Note>

export const Info: Story = {
  args: {
    type: "info",
    title: "Info Note",
    children: "This is an informational note."
  }
}

export const Success: Story = {
  args: {
    type: "success",
    title: "Success Note",
    children: "Your action was successful!"
  }
}

export const Warning: Story = {
  args: {
    type: "warning",
    title: "Warning Note",
    children: "This is a warning message."
  }
}

export const WithoutIcon: Story = {
  args: {
    type: "info",
    title: "No Icon Note",
    children: "This note does not show an icon.",
    isWithoutIcon: true
  }
}

export const WithCloseButton: Story = {
  args: {
    type: "info",
    title: "Closable Note",
    children: "This note can be closed.",
    onClose: () => {}
  }
}
