import type { Meta, StoryObj } from "@storybook/react"
import ImageButton from "./index"

const meta: Meta<typeof ImageButton> = {
  title: "UI/Actions/ImageButton",
  component: ImageButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ImageButton renders an interactive image button with optional title and description overlays, supporting links and custom effects."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    link: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
    isWithoutSaturationChange: { control: "boolean" },
    isWithoutTextBackground: { control: "boolean" },
    gap: { control: "text" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof ImageButton>

export const Default: Story = {
  args: {
    title: "Default Image Button",
    description: "This is a demo image button.",
    src: "https://picsum.photos/300/300",
    alt: "Demo image"
  }
}

export const NoSaturationChange: Story = {
  args: {
    title: "No Saturation Change",
    description: "Hover does not affect saturation.",
    src: "https://picsum.photos/300/300",
    alt: "Demo image",
    isWithoutSaturationChange: true
  }
}

export const NoTextBackground: Story = {
  args: {
    title: "No Text Background",
    description: "Text overlay has no blur background.",
    src: "https://picsum.photos/300/300",
    alt: "Demo image",
    isWithoutTextBackground: true
  }
}

export const CustomGap: Story = {
  args: {
    title: "Custom Gap",
    description: "Title and description have a larger gap.",
    src: "https://picsum.photos/300/300",
    alt: "Demo image",
    gap: "same-level-close"
  }
}
