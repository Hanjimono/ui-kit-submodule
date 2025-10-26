import type { Meta, StoryObj } from "@storybook/react"
import Demo from "./index"
import Button from "@/ui/Actions/Button"

const meta: Meta<typeof Demo> = {
  title: "UI/Presentation/Demo",
  component: Demo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Demo displays a demonstration and its corresponding code in a tabbed interface."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    code: { control: "text" },
    withoutCopy: { control: "boolean" },
    children: { control: false }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Demo>

const sampleCode = `function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));`

export const Default: Story = {
  args: {
    code: sampleCode,
    children: <Button primary>Demo Button</Button>
  }
}
