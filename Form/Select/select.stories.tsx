import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Select from "./index"
import Brick from "@/ui/Layout/Brick"

const options = [
  { title: "Option 1", value: "1" },
  { title: "Option 2", value: "2" },
  { title: "Option 3", value: "3" }
]

const meta: Meta<typeof Select> = {
  title: "UI/Form/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A custom Select component for forms, supporting single/multi-select, error handling, autocomplete, and more."
      }
    }
  },
  decorators: [
    (Story) => (
      <Brick className="w-64">
        <Story />
      </Brick>
    )
  ],
  argTypes: {
    label: { control: "text", description: "Label for the select field." },
    value: { control: "text", description: "Selected value(s)." },
    error: { control: "text", description: "Error message to display." },
    disabled: { control: "boolean", description: "Disable the select field." },
    options: { control: "object", description: "Select options." },
    multiselect: { control: "boolean", description: "Enable multi-select." },
    labelOnTop: { control: "boolean", description: "Label on top of select." },
    autocomplete: { control: "boolean", description: "Enable autocomplete." },
    onChange: { action: "changed", description: "Change event handler." },
    className: { control: "text", description: "Additional class names." },
    placeholder: { control: "text", description: "Select placeholder." }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    label: "Default Select",
    options,
    value: "1"
  },
  render: (args) => {
    const [value, setValue] = React.useState("1")
    return <Select {...args} value={value} onChange={(_, v) => setValue(v)} />
  }
}

export const Error: Story = {
  args: {
    label: "Select with Error",
    options,
    value: "1",
    error: "Invalid selection."
  },
  render: (args) => {
    const [value, setValue] = React.useState("1")
    return <Select {...args} value={value} onChange={(_, v) => setValue(v)} />
  }
}

export const Disabled: Story = {
  args: {
    label: "Disabled Select",
    options,
    value: "1",
    disabled: true
  },
  render: (args) => {
    const [value, setValue] = React.useState("1")
    return <Select {...args} value={value} onChange={(_, v) => setValue(v)} />
  }
}

export const MultiSelect: Story = {
  args: {
    label: "Multi Select",
    options,
    value: ["1", "2"],
    multiselect: true
  },
  render: (args) => {
    const [value, setValue] = React.useState(["1", "2"])
    return <Select {...args} value={value} onChange={(_, v) => setValue(v)} />
  }
}

export const LabelOnTop: Story = {
  args: {
    label: "Label on Top",
    options,
    value: "1",
    labelOnTop: true
  },
  render: (args) => {
    const [value, setValue] = React.useState("1")
    return <Select {...args} value={value} onChange={(_, v) => setValue(v)} />
  }
}

export const Autocomplete: Story = {
  args: {
    label: "Autocomplete Select",
    options,
    value: "1",
    autocomplete: true
  },
  render: (args) => {
    const [value, setValue] = React.useState("1")
    return <Select {...args} value={value} onChange={(_, v) => setValue(v)} />
  }
}
