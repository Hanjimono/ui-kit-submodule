import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import Drawer from "./index"
import Button from "@/ui/Actions/Button"

const meta: Meta<typeof Drawer> = {
  title: "UI/Navigation/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Drawer provides a sliding panel from various positions with animation and mask support."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    popupWrapperClassName: { control: "text" },
    from: {
      control: { type: "select" },
      options: ["left", "right", "top", "bottom"]
    },
    position: {
      control: { type: "select" },
      options: ["left", "right", "top", "bottom"]
    },
    mask: { control: "boolean" },
    isActive: { control: false },
    children: { control: false }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Drawer>

export const Left: Story = {
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
        <Button onClick={() => setActive(true)}>Open Drawer</Button>
        <Drawer {...args} isActive={active} from="left" position="left" mask>
          <div style={{ padding: 32, color: "white" }}>
            <h3>Left Drawer</h3>
            <Button onClick={() => setActive(false)} secondary>
              Close
            </Button>
          </div>
        </Drawer>
      </div>
    )
  },
  args: {}
}

export const Right: Story = {
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
        <Button onClick={() => setActive(true)}>Open Drawer</Button>
        <Drawer {...args} isActive={active} from="right" position="right" mask>
          <div style={{ padding: 32, color: "white" }}>
            <h3>Right Drawer</h3>
            <Button onClick={() => setActive(false)} secondary>
              Close
            </Button>
          </div>
        </Drawer>
      </div>
    )
  },
  args: {}
}

export const Top: Story = {
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
        <Button onClick={() => setActive(true)}>Open Drawer</Button>
        <Drawer {...args} isActive={active} from="top" position="top" mask>
          <div style={{ padding: 32, color: "white" }}>
            <h3>Top Drawer</h3>
            <Button onClick={() => setActive(false)} secondary>
              Close
            </Button>
          </div>
        </Drawer>
      </div>
    )
  },
  args: {}
}

export const Bottom: Story = {
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
        <Button onClick={() => setActive(true)}>Open Drawer</Button>
        <Drawer
          {...args}
          isActive={active}
          from="bottom"
          position="bottom"
          mask
        >
          <div style={{ padding: 32, color: "white" }}>
            <h3>Bottom Drawer</h3>
            <Button onClick={() => setActive(false)} secondary>
              Close
            </Button>
          </div>
        </Drawer>
      </div>
    )
  },
  args: {}
}
