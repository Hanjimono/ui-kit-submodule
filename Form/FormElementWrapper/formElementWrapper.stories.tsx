import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import FormElementWrapper, {
  FormContextElementWrapper,
  FormElementNestedWrapper,
  FormElementLine
} from "./index"
import Input from "../Input"
import Brick from "@/ui/Layout/Brick"

const meta: Meta<typeof FormElementWrapper> = {
  title: "UI/Form/FormElementWrapper",
  component: FormElementWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "FormElementWrapper and related components provide additional functionality for form elements, such as handling changes, clearing fields, and form submission."
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
    children: { control: "text", description: "Content inside the wrapper." }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof FormElementWrapper>

export const Default: Story = {
  render: () => (
    <FormElementWrapper>
      <Input label="Input" name="input" value="" onChange={() => {}} />
    </FormElementWrapper>
  )
}

export const ContextWrapper: Story = {
  render: () => (
    <FormContextElementWrapper>
      <Input label="Input" name="input" value="" onChange={() => {}} />
    </FormContextElementWrapper>
  )
}

export const NestedWrapper: Story = {
  render: () => (
    <FormElementNestedWrapper>
      <FormElementWrapper>
        <Input label="Input" name="input" value="" onChange={() => {}} />
      </FormElementWrapper>
    </FormElementNestedWrapper>
  )
}

export const LineWrapper: Story = {
  render: () => (
    <FormElementLine>
      <Input label="Input 1" name="input1" value="" onChange={() => {}} />
      <Input label="Input 2" name="input2" value="" onChange={() => {}} />
    </FormElementLine>
  )
}
