import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Switch from "./index"
import Brick from "@/ui/Layout/Brick"

const meta: Meta<typeof Switch> = {
  title: "UI/Form/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable Switch component for forms, supporting error handling, labels, and more. Can be used standalone or with react-hook-form."
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
    label: { control: "text", description: "Label for the switch." },
    leftLabel: { control: "text", description: "Label on the left side." },
    checked: { control: "boolean", description: "Checked state." },
    error: { control: "text", description: "Error message to display." },
    disabled: { control: "boolean", description: "Disable the switch." },
    switchOnText: { control: "text", description: "Text when switch is ON." },
    switchOffText: { control: "text", description: "Text when switch is OFF." },
    withoutText: { control: "boolean", description: "Hide text on switch." },
    onChange: { action: "changed", description: "Change event handler." },
    className: { control: "text", description: "Additional class names." }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    label: "Default Switch",
    checked: false
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={() => setChecked((c) => !c)}
      />
    )
  }
}

export const Checked: Story = {
  args: {
    label: "Checked Switch",
    checked: true
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(true)
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={() => setChecked((c) => !c)}
      />
    )
  }
}

export const Error: Story = {
  args: {
    label: "Switch with Error",
    checked: false,
    error: "This field is required."
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={() => setChecked((c) => !c)}
      />
    )
  }
}

export const Disabled: Story = {
  args: {
    label: "Disabled Switch",
    checked: false,
    disabled: true
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={() => setChecked((c) => !c)}
      />
    )
  }
}

export const WithText: Story = {
  args: {
    label: "Switch with Custom Text",
    checked: false,
    switchOnText: "YES",
    switchOffText: "NO"
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={() => setChecked((c) => !c)}
      />
    )
  }
}

export const WithoutText: Story = {
  args: {
    label: "Switch without Text",
    checked: false,
    withoutText: true
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={() => setChecked((c) => !c)}
      />
    )
  }
}

export const LeftLabel: Story = {
  args: {
    label: "Switch",
    leftLabel: "Left Label",
    checked: false
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={() => setChecked((c) => !c)}
      />
    )
  }
}
