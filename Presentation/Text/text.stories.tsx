import type { Meta, StoryObj } from "@storybook/react"
import Text from "./index"

const meta: Meta<typeof Text> = {
  title: "UI/Presentation/Text",
  component: Text,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text is a versatile component for various text styles, sizes, and HTML tags. Supports bold, italic, clipping, and color variants."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    children: { control: "text" },
    bold: { control: "boolean" },
    semibold: { control: "boolean" },
    italic: { control: "boolean" },
    size: {
      control: { type: "select" },
      options: ["default", "small", "extra-small", "large"]
    },
    type: {
      control: { type: "select" },
      options: ["plain", "paragraph", "fit-line"]
    },
    clip: { control: "boolean" },
    isLight: { control: "boolean" },
    isAccent: { control: "boolean" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: {
    children: "Default text"
  }
}

export const Bold: Story = {
  args: {
    children: "Bold text",
    bold: true
  }
}

export const Semibold: Story = {
  args: {
    children: "Semibold text",
    semibold: true
  }
}

export const Italic: Story = {
  args: {
    children: "Italic text",
    italic: true
  }
}

export const Small: Story = {
  args: {
    children: "Small text",
    size: "small"
  }
}

export const ExtraSmall: Story = {
  args: {
    children: "Extra small text",
    size: "extra-small"
  }
}

export const Large: Story = {
  args: {
    children: "Large text",
    size: "large"
  }
}

export const Paragraph: Story = {
  args: {
    children: "Paragraph text",
    type: "paragraph"
  }
}

export const FitLine: Story = {
  args: {
    children: "Fit line text",
    type: "fit-line"
  }
}

export const Clipped: Story = {
  args: {
    children:
      "This is a very long clipped text that should not overflow the container.",
    clip: true,
    size: "small"
  }
}

export const Light: Story = {
  args: {
    children: "Light text",
    isLight: true
  }
}

export const Accent: Story = {
  args: {
    children: "Accent text",
    isAccent: true
  }
}
