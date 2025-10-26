import type { Meta, StoryObj } from "@storybook/react"
import Code from "./index"

const meta: Meta<typeof Code> = {
  title: "UI/Presentation/Code",
  component: Code,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Code renders a block of code with optional line numbers and a copy-to-clipboard button."
      }
    }
  },
  argTypes: {
    code: { control: "text" },
    className: { control: "text" },
    withoutCopy: { control: "boolean" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Code>

const sampleCode = `function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));`

export const Default: Story = {
  args: {
    code: sampleCode,
    className: "w-96"
  }
}

export const WithoutCopy: Story = {
  args: {
    code: sampleCode,
    withoutCopy: true,
    className: "w-96"
  }
}
