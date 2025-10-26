import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import PortalPopupAppearTransition from "./index"

const meta: Meta<typeof PortalPopupAppearTransition> = {
  title: "UI/Skeleton/Transition/PortalPopupAppearTransition",
  component: PortalPopupAppearTransition,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Handles the appearance and disappearance of a popup with a transition animation, using Portal and PopupContainer."
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
          border: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Story />
      </div>
    )
  ],
  argTypes: {
    isActive: {
      control: "boolean",
      description: "Determines if the popup is active and should be displayed."
    },
    children: {
      control: "text",
      description: "Content to be displayed inside the popup."
    },
    mask: {
      control: "boolean",
      description: "Show a mask behind the popup."
    }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof PortalPopupAppearTransition>

export const Default: Story = {
  args: {
    isActive: true,
    children: (
      <div
        style={{ padding: "16px", background: "#dbeafe", borderRadius: "8px" }}
      >
        Default Popup Content
      </div>
    )
  },
  render: (args) => {
    const [show, setShow] = React.useState(false)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center"
        }}
      >
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
          {show ? "Hide" : "Show"} Popup
        </button>
        <PortalPopupAppearTransition isActive={show} mask={true}>
          <div
            style={{
              padding: "16px",
              background: "#bbf7d0",
              borderRadius: "8px"
            }}
          >
            Interactive popup content!
          </div>
        </PortalPopupAppearTransition>
      </div>
    )
  }
}

export const WithMask: Story = {
  args: {
    isActive: true,
    mask: true,
    children: (
      <div
        style={{ padding: "16px", background: "#bbf7d0", borderRadius: "8px" }}
      >
        Popup with Mask
      </div>
    )
  },
  render: (args) => {
    const [show, setShow] = React.useState(false)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center"
        }}
      >
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
          {show ? "Hide" : "Show"} Popup
        </button>
        <PortalPopupAppearTransition isActive={show} mask={true}>
          <div
            style={{
              padding: "16px",
              background: "#bbf7d0",
              borderRadius: "8px"
            }}
          >
            Interactive popup content!
          </div>
        </PortalPopupAppearTransition>
      </div>
    )
  }
}
