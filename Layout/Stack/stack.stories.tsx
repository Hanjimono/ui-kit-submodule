import type { Meta, StoryObj } from "@storybook/react"
import Stack from "./index"
import Brick from "../Brick"

const meta: Meta<typeof Stack> = {
  title: "UI/Layout/Stack",
  component: Stack,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Stack component for laying out items with a customizable gap."
      }
    }
  },
  argTypes: {
    gap: {
      control: { type: "select" },
      options: [
        "none",
        "tight",
        "close",
        "same-level-close",
        "same-level",
        "distant",
        "extra-distant"
      ],
      defaultValue: "same-level"
    },
    isWrap: { control: "boolean" },
    className: { control: "text" },
    children: { control: false }
  },
  tags: ["autodocs"]
}
export default meta
type Story = StoryObj<typeof Stack>

export const Default: Story = {
  args: {
    children: [
      <Brick key="1">Item 1</Brick>,
      <Brick key="2">Item 2</Brick>,
      <Brick key="3">Item 3</Brick>
    ]
  }
}

export const TightGap: Story = {
  args: {
    gap: "tight",
    children: [<Brick key="1">Tight 1</Brick>, <Brick key="2">Tight 2</Brick>]
  }
}

export const DistantGap: Story = {
  args: {
    gap: "distant",
    children: [<Brick key="1">istant 1</Brick>, <Brick key="2">istant 2</Brick>]
  }
}
