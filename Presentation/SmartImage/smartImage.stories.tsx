import type { Meta, StoryObj } from "@storybook/react"
import SmartImage from "./index"

const meta: Meta<typeof SmartImage> = {
  title: "UI/Presentation/SmartImage",
  component: SmartImage,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "SmartImage renders an image with formatted source URL. Handles /public prefix and supports alt text and custom styling."
      }
    }
  },
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof SmartImage>

export const Default: Story = {
  args: {
    src: "https://picsum.photos/200/300",
    alt: "Demo image",
    width: 200,
    height: 300
  }
}
