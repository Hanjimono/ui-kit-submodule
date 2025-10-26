import type { Meta, StoryObj } from "@storybook/react"
import Portal from "./index"
import { useState } from "react"

const meta: Meta<typeof Portal> = {
  title: "UI/Skeleton/Portal",
  component: Portal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Portal component that renders its children into a DOM node outside of the current DOM hierarchy. Useful for modals, tooltips, and overlays."
      }
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "400px",
          height: "300px",
          position: "relative",
          border: "1px solid #eee"
        }}
      >
        <div
          id="portal-target"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "100px",
            background: "#f0f0f0",
            border: "1px dashed #aaa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          Portal Target
        </div>
        <Story />
      </div>
    )
  ],
  argTypes: {
    selector: {
      control: "text",
      description:
        "CSS selector for the portal target. If not provided, defaults to document.body."
    },
    children: {
      control: "text",
      description: "Content to render inside the portal."
    }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Portal>

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          padding: "8px 16px",
          background: "#dbeafe",
          borderRadius: "6px",
          boxShadow: "0 2px 8px #0001"
        }}
      >
        This is rendered in document.body via Portal.
      </div>
    )
  },
  render: (args) => <Portal {...args} />
}

export const CustomSelector: Story = {
  args: {
    selector: "#portal-target",
    children: (
      <div
        style={{
          padding: "8px 16px",
          background: "#fef9c3",
          borderRadius: "6px",
          boxShadow: "0 2px 8px #0001"
        }}
      >
        This is rendered in #portal-target via Portal.
      </div>
    )
  },
  render: (args) => <Portal {...args} />
}

export const Interactive: Story = {
  args: {
    selector: "#portal-target"
  },
  render: (args) => {
    const [show, setShow] = useState(false)
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <button
          onClick={() => setShow((s) => !s)}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            background: "#bae6fd",
            border: "none",
            cursor: "pointer"
          }}
        >
          {show ? "Hide" : "Show"} Portal Content
        </button>
        {show && (
          <Portal selector={args.selector}>
            <div
              style={{
                padding: "8px 16px",
                background: "#bbf7d0",
                borderRadius: "6px",
                boxShadow: "0 2px 8px #0001"
              }}
            >
              Interactive portal content!
            </div>
          </Portal>
        )}
      </div>
    )
  }
}
