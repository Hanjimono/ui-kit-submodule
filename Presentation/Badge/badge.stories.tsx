import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import Badge from "./index"
import Button from "@/ui/Actions/Button"

const meta: Meta<typeof Badge> = {
  title: "UI/Presentation/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Badge displays a number with animation effects. Supports max number, show without number, and custom styling."
      }
    }
  },
  argTypes: {
    number: { control: "number" },
    maxNumber: { control: "number" },
    showWithoutNumber: { control: "boolean" },
    className: { control: "text" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    number: 5
  }
}

export const MaxNumber: Story = {
  args: {
    number: 120,
    maxNumber: 9
  }
}

export const ShowWithoutNumber: Story = {
  args: {
    showWithoutNumber: true
  }
}

export const AnimatedChange: Story = {
  render: (args) => {
    const [num, setNum] = useState(1)
    return (
      <Button
        className="overflow-visible"
        onClick={() => setNum((n) => (n < 10 ? n + 1 : 1))}
      >
        Increment
        <Badge {...args} number={num} />
      </Button>
    )
  },
  args: {}
}
