import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Form from "./index"
import Input from "../Input"
import Switch from "../Switch"
import FormSubmit from "../FormSubmit"
import Brick from "@/ui/Layout/Brick"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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

const defaultValidationSchema = z.object({
  name: z.string().optional(),
  agree: z.boolean().optional()
})

export const Default: Story = {
  args: {
    gap: "same-level-close",
    validationSchema: defaultValidationSchema
  },
  render: (args) => {
    return (
      <Form {...args} onSubmit={(data) => alert(`Submitted: ${JSON.stringify(data)}`)}>
        <Input label="Name" name="name" />
        <Switch label="Agree to Terms" name="agree" />
        <FormSubmit>Submit</FormSubmit>
      </Form>
    )
  }
}

const userValidationSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
  age: z.coerce.number().gte(18)
})

type User = z.infer<typeof userValidationSchema>

export const WithValidation: Story = {
  args: {
    gap: "same-level-close",
    defaultValues: {
      name: ""
    },
    validationSchema: userValidationSchema
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the Form component with validation using a Zod schema. The form includes fields for name and age, with validation rules applied to ensure the name is not empty and the age is at least 18."
      }
    }
  },
  render: (args) => {
    return (
      <Form {...args} onSubmit={(data) => alert(`Submitted: ${JSON.stringify(data)}`)}>
        <Input label="Name" name="name" />
        <Input label="Age" name="age" type="number" />
        <FormSubmit>Submit</FormSubmit>
      </Form>
    )
  }
}

export const WithCustomWatchMethods: Story = {
  args: {
    gap: "same-level-close"
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the Form component using custom watch methods. If you need some specific behavior with form, you can implement react-hook-form's methods by yourself and pass them to the Form component."
      }
    }
  },
  render: (args) => {
    const methods = useForm<User>({
      mode: "onChange",
      resolver: zodResolver(userValidationSchema),
      defaultValues: { name: "" }
    })
    const currentName = methods.watch("name")
    return (
      <Form methods={methods} onSubmit={(data) => alert(`Submitted: ${JSON.stringify(data)}`)}>
        <Input label="Name" name="name" />
        <Input label="Age" name="age" type="number" />
        <div>Current Name: {currentName}</div>
        <FormSubmit>Submit</FormSubmit>
      </Form>
    )
  }
}

export const CustomFormWithoutZod: Story = {
  args: {
    gap: "same-level-close",
    defaultValues: {
      name: ""
    }
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the Form component without using Zod for validation. It shows how to create a simple form with default values and handle submission without schema validation."
      }
    }
  },
  render: (args) => {
    const [formData, setFormData] = React.useState<{ name: string }>({ name: "" })
    return (
      <Form
        {...args}
        onChange={(name, value) => setFormData({ ...formData, [name]: value })}
        onSubmit={() => alert(`Submitted: ${JSON.stringify(formData)}`)}
      >
        <Input label="Name" name="name" value={formData.name} />
        <FormSubmit>Submit</FormSubmit>
      </Form>
    )
  }
}
