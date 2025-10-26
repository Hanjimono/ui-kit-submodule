import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Radio from "./index"
import Brick from "@/ui/Layout/Brick"

const options = [
  { title: "Option 1", value: "1" },
  { title: "Option 2", value: "2" },
  { title: "Option 3", value: "3" }
]

const meta: Meta<typeof Radio> = {
  title: "UI/Form/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radio component for forms. Renders a group of radio buttons with error handling and custom layout."
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
    name: { control: "text", description: "Name of the radio group." },
    value: { control: "text", description: "Selected value." },
    error: { control: "text", description: "Error message to display." },
    disabled: { control: "boolean", description: "Disable all radio buttons." },
    className: { control: "text", description: "Additional class names." },
    type: {
      control: "select",
      options: ["columns", "rows"],
      description: "Layout type."
    },
    onChange: { action: "changed", description: "Change event handler." },
    options: { control: "object", description: "Radio options." }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Radio>

export const Default: Story = {
  args: {
    name: "radio-group",
    value: "1",
    options
  },
  render: (args) => {
    const [value, setValue] = React.useState("1")
    return <Radio {...args} value={value} onChange={(_, v) => setValue(v)} />
  }
}

export const Error: Story = {
  args: {
    name: "radio-group",
    value: "1",
    options,
    error: "Please select an option."
  },
  render: (args) => {
    const [value, setValue] = React.useState("1")
    return (
      <Brick className="w-64">
        <Radio {...args} value={value} onChange={(_, v) => setValue(v)} />
      </Brick>
    )
  }
}

export const Disabled: Story = {
  args: {
    name: "radio-group",
    value: "1",
    options,
    disabled: true
  },
  render: (args) => {
    const [value, setValue] = React.useState("1")
    return <Radio {...args} value={value} onChange={(_, v) => setValue(v)} />
  }
}

export const Rows: Story = {
  args: {
    name: "radio-group",
    value: "1",
    options,
    type: "rows"
  },
  render: (args) => {
    const [value, setValue] = React.useState("1")
    return (
      <Brick className="w-96">
        <Radio {...args} value={value} onChange={(_, v) => setValue(v)} />
      </Brick>
    )
  }
}
