import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Checkbox from "./index"
import Brick from "@/ui/Layout/Brick"

const meta: Meta<typeof Checkbox> = {
  title: "UI/Form/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Checkbox component for forms. Can be used standalone or with form libraries like react-hook-form."
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
    label: { control: "text", description: "Label for the checkbox." },
    checked: { control: "boolean", description: "Checked state." },
    error: { control: "text", description: "Error message to display." },
    disabled: { control: "boolean", description: "Disable the checkbox." },
    className: { control: "text", description: "Additional class names." },
    onChange: { action: "changed", description: "Change event handler." }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: "Default Checkbox"
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={() => setChecked((c) => !c)}
      />
    )
  }
}

export const Error: Story = {
  args: {
    label: "Checkbox with Error",
    error: "This field is required."
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={() => setChecked((c) => !c)}
      />
    )
  }
}

export const Disabled: Story = {
  args: {
    label: "Disabled Checkbox",
    disabled: true
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={() => setChecked((c) => !c)}
      />
    )
  }
}
