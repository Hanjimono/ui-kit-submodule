import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Field from "./index"
import Brick from "@/ui/Layout/Brick"
import Input from "../Input"

const meta: Meta<typeof Field> = {
  title: "UI/Form/Field",
  component: Field,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Field component wraps a form element, displays a label and error message, and accepts the same props as Pillar."
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
    label: { control: "text", description: "Label for the field." },
    error: { control: "text", description: "Error message to display." },
    className: { control: "text", description: "Additional class names." },
    fakeLabel: { control: "boolean", description: "Render a fake label." },
    children: { control: "text", description: "Content inside the field." }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Field>

export const Default: Story = {
  args: {
    label: "Default Field"
  },
  render: (args) => (
    <Field {...args}>
      <Input name="input" label="Input" value="" onChange={() => {}} />
    </Field>
  )
}

export const WithError: Story = {
  args: {
    label: "Field with Error",
    error: "This field is required."
  },
  render: (args) => (
    <Field {...args}>
      <Input name="input" label="Input" value="" onChange={() => {}} />
    </Field>
  )
}

export const FakeLabel: Story = {
  args: {
    fakeLabel: true
  },
  render: (args) => (
    <Field {...args}>
      <Input name="input" label="Input" value="" onChange={() => {}} />
    </Field>
  )
}
