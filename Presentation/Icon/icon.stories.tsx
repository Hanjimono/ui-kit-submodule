import type { Meta, StoryObj } from "@storybook/react"
import Icon from "./index"

const meta: Meta<typeof Icon> = {
  title: "UI/Presentation/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Icon renders Material Design, FontAwesome, or custom icons. Supports size, type, and custom styling."
      }
    }
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["md", "fa", "custom"]
    },
    name: { control: "text" },
    size: { control: "number" },
    faType: { control: "text" },
    customIconLink: { control: "text" },
    hoverIconLink: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
    alt: { control: "text" },
    className: { control: "text" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Icon>

export const MaterialDesign: Story = {
  args: {
    type: "md",
    name: "star",
    size: 32
  }
}

export const FontAwesome: Story = {
  args: {
    type: "fa",
    name: "star",
    size: 32
  }
}

export const CustomIcon: Story = {
  args: {
    type: "custom",
    customIconLink: "https://picsum.photos/32/32",
    size: 32,
    alt: "Custom Icon"
  }
}

export const CustomIconWithHover: Story = {
  args: {
    type: "custom",
    customIconLink: "https://picsum.photos/32/32",
    hoverIconLink: "https://picsum.photos/32/32",
    size: 32,
    alt: "Custom Icon Hover"
  }
}
