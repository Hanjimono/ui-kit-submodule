import type { Meta, StoryObj } from "@storybook/react"
import Frame from "./index"
import Brick from "../Brick"

const meta: Meta<typeof Frame> = {
  title: "UI/Layout/Frame",
  component: Frame,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Frame wraps main content and adds a vertical scrollbar."
      }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200px", overflow: "hidden" }}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    className: { control: "text" },
    children: { control: false }
  },
  tags: ["autodocs"]
}
export default meta
type Story = StoryObj<typeof Frame>

export const Default: Story = {
  args: {
    className: "bg-blue-50 border border-blue-200",
    children: (
      <div style={{ minHeight: 400 }}>
        <Brick>Frame content (scroll if needed)</Brick>
        <div style={{ height: 600 }} />
        <Brick>Bottom Brick</Brick>
      </div>
    )
  }
}
