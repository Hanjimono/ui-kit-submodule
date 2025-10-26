import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import ContentAppearTransition from "./index"

const meta: Meta<typeof ContentAppearTransition> = {
  title: "UI/Skeleton/Transition/ContentAppearTransition",
  component: ContentAppearTransition,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ContentAppearTransition provides a smooth transition effect for its children when mounted, using Framer Motion."
      }
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "400px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #eee"
        }}
      >
        <Story />
      </div>
    )
  ],
  argTypes: {
    children: {
      control: "text",
      description: "Content to be wrapped by the transition."
    },
    className: {
      control: "text",
      description: "Additional class names."
    },
    animationVariant: {
      control: "select",
      options: ["fade", "slideUp", "slideDown", "scale"],
      description: "Animation variant to use."
    }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof ContentAppearTransition>

export const Simple: Story = {
  args: {
    animationVariant: "simple",
    children: (
      <div
        style={{ padding: "16px", background: "#dbeafe", borderRadius: "8px" }}
      >
        Fade In Content
      </div>
    )
  },
  render: (args) => {
    const [show, setShow] = React.useState(false)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center"
        }}
      >
        <button
          onClick={() => setShow((s) => !s)}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            background: "#bae6fd",
            border: "none",
            cursor: "pointer"
          }}
        >
          {show ? "Hide" : "Show"} Content
        </button>
        {show && (
          <ContentAppearTransition animationVariant={args.animationVariant}>
            <div
              style={{
                padding: "16px",
                background: "#fca5a5",
                borderRadius: "8px"
              }}
            >
              Interactive transition content!
            </div>
          </ContentAppearTransition>
        )}
      </div>
    )
  }
}

export const Slide: Story = {
  args: {
    animationVariant: "slide-both-sides",
    children: (
      <div
        style={{ padding: "16px", background: "#bbf7d0", borderRadius: "8px" }}
      >
        Slide Up Content
      </div>
    )
  },
  render: (args) => {
    const [show, setShow] = React.useState(false)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center"
        }}
      >
        <button
          onClick={() => setShow((s) => !s)}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            background: "#bae6fd",
            border: "none",
            cursor: "pointer"
          }}
        >
          {show ? "Hide" : "Show"} Content
        </button>
        {show && (
          <ContentAppearTransition animationVariant={args.animationVariant}>
            <div
              style={{
                padding: "16px",
                background: "#fca5a5",
                borderRadius: "8px"
              }}
            >
              Interactive transition content!
            </div>
          </ContentAppearTransition>
        )}
      </div>
    )
  }
}
