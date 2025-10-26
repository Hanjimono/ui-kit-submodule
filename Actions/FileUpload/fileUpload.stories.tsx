import type { Meta, StoryObj } from "@storybook/react"
import FileUpload from "./index"

const meta: Meta<typeof FileUpload> = {
  title: "UI/Actions/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "FileUpload allows users to upload a file by drag-and-drop or browsing. Shows file info and allows removal."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    placeholder: { control: "text" },
    onFileChange: { action: "fileChanged" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof FileUpload>

export const Default: Story = {
  args: {
    className: "w-64",
    placeholder: "Drop to upload file"
  }
}
