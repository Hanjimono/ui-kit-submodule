import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Form from "./index"
import Input from "../Input"
import Switch from "../Switch"
import FormSubmit from "../FormSubmit"
import Brick from "@/ui/Layout/Brick"

const meta: Meta<typeof Form> = {
  title: "UI/Form/Form",
  component: Form,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form component that wraps its children with form-related context and functionality. Integrates with react-hook-form and supports validation, gaps, and custom submit handling."
      }
    }
  },
  decorators: [
    (Story) => (
      <Brick className="w-96">
        <Story />
      </Brick>
    )
  ],
  argTypes: {
    gap: { control: "text", description: "Gap between form items." },
    className: { control: "text", description: "Additional class names." },
    onChange: { action: "changed", description: "Form change event handler." },
    onSubmit: {
      action: "submitted",
      description: "Form submit event handler."
    },
    onInvalidSubmit: {
      action: "invalid",
      description: "Invalid submit event handler."
    },
    useContext: { control: "boolean", description: "Use FormProvider context." }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Form>

export const Default: Story = {
  args: {
    gap: "same-level-close"
  },
  render: (args) => {
    const [formData, setFormData] = React.useState({
      name: "",
      agree: false
    })
    return (
      <Form
        {...args}
        onChange={(name, value) =>
          setFormData((d) => ({ ...d, [name]: value }))
        }
        onSubmit={() => alert(`Submitted: ${JSON.stringify(formData)}`)}
      >
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={(name, value) =>
            setFormData((d) => ({ ...d, [name]: value }))
          }
        />
        <Switch
          label="Agree to Terms"
          name="agree"
          checked={formData.agree}
          onChange={(name, value) =>
            setFormData((d) => ({ ...d, [name]: value }))
          }
        />
        <FormSubmit
          onSubmit={() => alert(`Submitted: ${JSON.stringify(formData)}`)}
        >
          Submit
        </FormSubmit>
      </Form>
    )
  }
}

export const WithGap: Story = {
  args: {
    gap: "distant"
  },
  render: Default.render
}

export const WithContext: Story = {
  args: {
    gap: "same-level-close",
    useContext: true
  },
  render: Default.render
}
