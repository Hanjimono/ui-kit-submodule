import type { Meta, StoryObj } from "@storybook/react"
import { useState, useRef } from "react"
import PopupContainer from "./index"
import Button from "@/ui/Actions/Button"
import Brick from "@/ui/Layout/Brick"

const meta: Meta<typeof PopupContainer> = {
  title: "UI/Skeleton/PopupContainer",
  component: PopupContainer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "PopupContainer displays a popup with animation, mask, and outside click handling. Supports custom styles and transitions."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    isActive: { control: false },
    mask: { control: "boolean" },
    withTransition: { control: "boolean" },
    withShadow: { control: "boolean" },
    checkOuterClick: { control: "boolean" },
    checkHover: { control: "boolean" },
    children: { control: false }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof PopupContainer>

export const Default: Story = {
  render: (args) => {
    const [active, setActive] = useState(false)
    const parentRef = useRef<HTMLDivElement>(null)
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
        ref={parentRef}
      >
        <Button onClick={() => setActive(true)} primary>
          Open Popup
        </Button>
        <PopupContainer
          {...args}
          isActive={active}
          onClose={() => setActive(false)}
          mask
          withTransition
          withShadow
          checkOuterClick
        >
          <div style={{ padding: 24, textAlign: "center" }}>
            <h3>Popup Content</h3>
            <Button onClick={() => setActive(false)} secondary>
              Close
            </Button>
          </div>
        </PopupContainer>
      </div>
    )
  },
  args: {}
}

export const WithoutMask: Story = {
  render: (args) => {
    const [active, setActive] = useState(false)
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
        <Button onClick={() => setActive(true)}>Open Popup</Button>
        <PopupContainer
          {...args}
          isActive={active}
          onClose={() => setActive(false)}
          withTransition
          withShadow
          checkOuterClick
        >
          <Brick style={{ padding: 24, textAlign: "center" }}>
            <h3>Popup Content</h3>
            <Button onClick={() => setActive(false)} secondary>
              Close
            </Button>
          </Brick>
        </PopupContainer>
      </div>
    )
  },
  args: {}
}

export const HoverToClose: Story = {
  render: (args) => {
    const [active, setActive] = useState(false)
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
        <Button onClick={() => setActive(true)}>Open Popup</Button>
        <PopupContainer
          {...args}
          isActive={active}
          onClose={() => setActive(false)}
          withTransition
          withShadow
          checkHover
        >
          <Brick style={{ padding: 24, textAlign: "center" }}>
            <h3>Popup Content</h3>
            <p>Move mouse out to close.</p>
          </Brick>
        </PopupContainer>
      </div>
    )
  },
  args: {}
}
