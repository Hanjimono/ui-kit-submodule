import type { Meta, StoryObj } from "@storybook/react"
import Spacer from "./index"
import Inline from "../Inline"
import Button from "@/ui/Actions/Button"

const meta: Meta<typeof Spacer> = {
  title: "UI/Layout/Spacer",
  component: Spacer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Spacer is a flexible component that expands to fill available space within a flex container."
      }
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{ width: "400px", display: "flex", justifyContent: "center" }}
      >
        <Story />
      </div>
    )
  ],
  argTypes: {
    className: { control: "text" }
  },
  tags: ["autodocs"]
}
export default meta
type Story = StoryObj<typeof Spacer>

export const Default: Story = {
  render: () => (
    <Inline className="w-full bg-gray-100 p-4 rounded">
      <Button>Left</Button>
      <Spacer />
      <Button>Right 1</Button>
      <Button>Right 2</Button>
    </Inline>
  )
}
