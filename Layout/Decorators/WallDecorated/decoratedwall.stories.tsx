import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import WallDecorated from "./index"
import Button from "@/ui/Actions/Button"
import Brick from "../../Brick"

const meta: Meta<typeof WallDecorated> = {
  title: "UI/Layout/WallDecorated",
  component: WallDecorated,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "WallDecorated wraps the Wall component with optional animation and additional styling."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    animationMode: {
      control: { type: "select" },
      options: ["simple", "fade", "none"]
    },
    isShortYPadding: { control: "boolean" },
    isOnlyXPadding: { control: "boolean" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof WallDecorated>

export const Default: Story = {
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
        <Button onClick={() => setVisible((v) => !v)}>
          {visible ? "Hide Wall" : "Show Wall"}
        </Button>
        {visible && (
          <WallDecorated {...args}>
            <Brick style={{ padding: 24, textAlign: "center" }}>
              <h3>Animated Wall</h3>
              <p>This wall appears with a transition.</p>
            </Brick>
          </WallDecorated>
        )}
      </div>
    )
  },
  args: {
    animationMode: "simple"
  }
}

export const SlideFromBothSides: Story = {
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
        <Button onClick={() => setVisible((v) => !v)}>
          {visible ? "Hide Wall" : "Show Wall"}
        </Button>
        {visible && (
          <WallDecorated {...args}>
            <Brick style={{ padding: 24, textAlign: "center" }}>
              <h3>Animated Wall</h3>
              <p>This wall appears with a transition.</p>
            </Brick>
          </WallDecorated>
        )}
      </div>
    )
  },
  args: {
    animationMode: "slide-both-sides"
  }
}
