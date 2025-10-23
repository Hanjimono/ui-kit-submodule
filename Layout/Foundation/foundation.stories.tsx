import type { Meta, StoryObj } from "@storybook/react"
import Foundation from "./index"

const meta: Meta<typeof Foundation> = {
  title: "UI/Layout/Foundation",
  component: Foundation,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Foundation is a root layout component that takes all available screen space and provides a background for your app."
      }
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "60vh",
          background: "#f0f0f0"
        }}
      >
        <Story />
      </div>
    )
  ],
  argTypes: {
    className: { control: "text" },
    children: { control: "text" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Foundation>

export const Default: Story = {
  args: {
    children: "This is inside the Foundation layout.",
    className: ""
  }
}
