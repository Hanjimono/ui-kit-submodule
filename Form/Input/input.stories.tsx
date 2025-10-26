import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Input from "./index"
import Brick from "@/ui/Layout/Brick"

const meta: Meta<typeof Input> = {
  title: "UI/Form/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile Input component for forms, supporting icons, error handling, formatting, and more. Can be used standalone or with react-hook-form."
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
    label: { control: "text", description: "Label for the input field." },
    value: { control: "text", description: "Value of the input field." },
    error: { control: "text", description: "Error message to display." },
    disabled: { control: "boolean", description: "Disable the input field." },
    icon: { control: "text", description: "Icon to display at the start." },
    endIcon: { control: "text", description: "Icon to display at the end." },
    loading: { control: "boolean", description: "Loading state." },
    clearable: { control: "boolean", description: "Show clear button." },
    filled: { control: "boolean", description: "Filled state." },
    labelOnTop: { control: "boolean", description: "Label on top of input." },
    onChange: { action: "changed", description: "Change event handler." },
    onClear: { action: "cleared", description: "Clear event handler." },
    className: { control: "text", description: "Additional class names." },
    placeholder: { control: "text", description: "Input placeholder." }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: "Default Input",
    value: ""
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Input {...args} value={value} onChange={(_, v) => setValue(v || "")} />
    )
  }
}

export const WithIcon: Story = {
  args: {
    label: "Input with Icon",
    value: "",
    icon: "search"
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Input {...args} value={value} onChange={(_, v) => setValue(v || "")} />
    )
  }
}

export const EndIcon: Story = {
  args: {
    label: "Input with End Icon",
    value: "",
    endIcon: "check"
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Input {...args} value={value} onChange={(_, v) => setValue(v || "")} />
    )
  }
}

export const Error: Story = {
  args: {
    label: "Input with Error",
    value: "",
    error: "Invalid value."
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Input {...args} value={value} onChange={(_, v) => setValue(v || "")} />
    )
  }
}

export const Loading: Story = {
  args: {
    label: "Loading Input",
    value: "",
    loading: true
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Input {...args} value={value} onChange={(_, v) => setValue(v || "")} />
    )
  }
}

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    value: "",
    disabled: true
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Input {...args} value={value} onChange={(_, v) => setValue(v || "")} />
    )
  }
}

export const Clearable: Story = {
  args: {
    label: "Clearable Input",
    value: "Some text",
    clearable: true
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Input
        {...args}
        value={value}
        onChange={(_, v) => setValue(v || "")}
        onClear={() => setValue("")}
      />
    )
  }
}

export const Filled: Story = {
  args: {
    label: "Filled Input",
    value: "Filled value",
    filled: true
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Input {...args} value={value} onChange={(_, v) => setValue(v || "")} />
    )
  }
}

export const LabelOnTop: Story = {
  args: {
    label: "Label on Top",
    value: "",
    labelOnTop: true
  },
  render: (args) => {
    const [value, setValue] = React.useState("")
    return (
      <Input {...args} value={value} onChange={(_, v) => setValue(v || "")} />
    )
  }
}
