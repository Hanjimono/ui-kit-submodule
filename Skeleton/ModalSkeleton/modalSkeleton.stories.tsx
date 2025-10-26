import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import ModalSkeleton from "./index"
import Button from "@/ui/Actions/Button"

const meta: Meta<typeof ModalSkeleton> = {
  title: "UI/Skeleton/ModalSkeleton",
  component: ModalSkeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ModalSkeleton is a modal wrapper with animation and optional mask. Supports closing on outside click."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    withoutMask: { control: "boolean" },
    isNotClosable: { control: "boolean" },
    onClose: { action: "closed" },
    children: { control: false }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof ModalSkeleton>

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
        <Button onClick={() => setVisible(true)} primary>
          Open ModalSkeleton
        </Button>
        {visible && (
          <ModalSkeleton {...args} onClose={() => setVisible(false)}>
            <div style={{ padding: 24, textAlign: "center" }}>
              <h3>ModalSkeleton Content</h3>
              <p>Click outside or mask to close.</p>
            </div>
          </ModalSkeleton>
        )}
      </div>
    )
  },
  args: {}
}

export const WithoutMask: Story = {
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
        <Button onClick={() => setVisible(true)}>Open ModalSkeleton</Button>
        {visible && (
          <ModalSkeleton
            {...args}
            onClose={() => setVisible(false)}
            withoutMask
          >
            <div style={{ padding: 24, textAlign: "center" }}>
              <h3>ModalSkeleton Content</h3>
              <p>No mask behind modal.</p>
            </div>
          </ModalSkeleton>
        )}
      </div>
    )
  },
  args: {}
}

export const NotClosable: Story = {
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
        <Button onClick={() => setVisible(true)}>Open ModalSkeleton</Button>
        {visible && (
          <ModalSkeleton
            {...args}
            onClose={() => setVisible(false)}
            isNotClosable
          >
            <div style={{ padding: 24, textAlign: "center" }}>
              <h3>ModalSkeleton Content</h3>
              <p>Cannot close by clicking outside.</p>
              <Button onClick={() => setVisible(false)} secondary>
                Close
              </Button>
            </div>
          </ModalSkeleton>
        )}
      </div>
    )
  },
  args: {}
}
