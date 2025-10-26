import type { Meta, StoryObj } from "@storybook/react"
import Loader from "./index"
import Brick from "@/ui/Layout/Brick"

const meta: Meta<typeof Loader> = {
  title: "UI/Presentation/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Loader displays a loading spinner. Supports multiple sizes and custom styling."
      }
    }
  },
  decorators: [
    (Story) => (
      <Brick>
        <Story />
      </Brick>
    )
  ],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "full"]
    }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Loader>

export const Small: Story = {
  args: {
    size: "sm"
  }
}

export const Medium: Story = {
  args: {
    size: "md"
  }
}

export const Large: Story = {
  args: {
    size: "lg"
  }
}

export const ExtraLarge: Story = {
  args: {
    size: "xl"
  }
}
