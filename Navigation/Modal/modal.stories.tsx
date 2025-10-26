import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import Modal from "./index"
import Button from "@/ui/Actions/Button"

const meta: Meta<typeof Modal> = {
  title: "UI/Navigation/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal renders a modal dialog with optional title and close button."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    title: { control: "text" },
    onClose: { action: "closed" },
    children: { control: "text" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    title: "Default Modal",
    children: "This is a modal dialog."
  }
}

export const OpenViaButton: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false)
    return (
      <div
        style={{
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16
        }}
      >
        <Button onClick={() => setVisible(true)}>Open Modal</Button>
        {visible && (
          <Modal {...args} onClose={() => setVisible(false)}>
            <div style={{ padding: 24, textAlign: "center" }}>
              <h3>Modal Content</h3>
              <p>This modal can be closed with the button.</p>
            </div>
          </Modal>
        )}
      </div>
    )
  },
  args: {
    title: "Closable Modal"
  }
}
