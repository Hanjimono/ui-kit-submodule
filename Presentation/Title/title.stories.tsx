import type { Meta, StoryObj } from "@storybook/react"
import Title from "./index"

const meta: Meta<typeof Title> = {
  title: "UI/Presentation/Title",
  component: Title,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Title renders heading typography with customizable size, alignment, uppercase, and color variants."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    children: { control: "text" },
    size: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6]
    },
    uppercase: { control: "boolean" },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right"]
    },
    isLight: { control: "boolean" },
    isAccent: { control: "boolean" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Title>

export const Default: Story = {
  args: {
    children: "Default Title"
  }
}

export const Size1: Story = {
  args: {
    children: "Heading 1",
    size: 1
  }
}

export const Size2: Story = {
  args: {
    children: "Heading 2",
    size: 2
  }
}

export const Size3: Story = {
  args: {
    children: "Heading 3",
    size: 3
  }
}

export const Size4: Story = {
  args: {
    children: "Heading 4",
    size: 4
  }
}

export const Size5: Story = {
  args: {
    children: "Heading 5",
    size: 5
  }
}

export const Size6: Story = {
  args: {
    children: "Heading 6",
    size: 6
  }
}

export const Uppercase: Story = {
  args: {
    children: "Uppercase Title",
    uppercase: true
  }
}

export const Centered: Story = {
  args: {
    children: "Centered Title",
    align: "center"
  }
}

export const RightAligned: Story = {
  args: {
    children: "Right Aligned Title",
    align: "right"
  }
}

export const Light: Story = {
  args: {
    children: "Light Title",
    isLight: true
  }
}

export const Accent: Story = {
  args: {
    children: "Accent Title",
    isAccent: true
  }
}
