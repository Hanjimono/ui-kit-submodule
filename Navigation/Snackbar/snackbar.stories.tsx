import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import Snackbar from "./index"
import Button from "@/ui/Actions/Button"

const meta: Meta<typeof Snackbar> = {
  title: "UI/Navigation/Snackbar",
  component: Snackbar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Snackbar displays a brief message at the bottom of the screen, supporting types, closable, and animation."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["info", "success", "warning", "critical"]
    },
    title: { control: "text" },
    closable: { control: "boolean" },
    isFirst: { control: "boolean" },
    duration: { control: "number" },
    children: { control: "text" },
    onClose: { action: "closed" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Snackbar>

export const Info: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false)
    return (
      <div
        style={{
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16
        }}
      >
        <Button onClick={() => setVisible(true)}>Show Snackbar</Button>
        {visible && (
          <Snackbar {...args} onClose={() => setVisible(false)}>
            Manual close example.
          </Snackbar>
        )}
      </div>
    )
  },
  args: {
    type: "info",
    title: "Info Snackbar",
    children: "This is an informational message.",
    closable: true,
    duration: 3000
  }
}

export const Success: Story = {
  args: {
    type: "success",
    title: "Success Snackbar",
    children: "Your action was successful!",
    closable: true,
    duration: 3000
  }
}

export const Warning: Story = {
  args: {
    type: "warning",
    title: "Warning Snackbar",
    children: "This is a warning message.",
    closable: true,
    duration: 3000
  }
}

export const Critical: Story = {
  args: {
    type: "critical",
    title: "Critical Snackbar",
    children: "A critical error occurred.",
    closable: true,
    duration: 3000
  }
}

export const WithManualClose: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false)
    return (
      <div
        style={{
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16
        }}
      >
        <Button onClick={() => setVisible(true)}>Show Snackbar</Button>
        {visible && (
          <Snackbar {...args} onClose={() => setVisible(false)}>
            Manual close example.
          </Snackbar>
        )}
      </div>
    )
  },
  args: {
    type: "info",
    title: "Manual Close",
    closable: true
  }
}
