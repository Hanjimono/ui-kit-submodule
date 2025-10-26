import type { Meta, StoryObj } from "@storybook/react"
import Tooltip, { TooltipIcon } from "./index"
import Button from "@/ui/Actions/Button"

const meta: Meta<typeof Tooltip> = {
  title: "UI/Presentation/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tooltip displays a tooltip when hovering over the child elements. Supports position, variant, and custom styling."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    tooltip: { control: "text" },
    place: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"]
    },
    variant: {
      control: { type: "select" },
      options: ["dark", "light", "success", "warning", "error"]
    },
    styled: { control: "boolean" },
    forceHide: { control: "boolean" },
    children: { control: false }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args} tooltip="Default tooltip">
      <Button primary>Hover me</Button>
    </Tooltip>
  ),
  args: {}
}

export const ForceHide: Story = {
  render: (args) => (
    <Tooltip {...args} tooltip="Should not show" forceHide>
      <Button light>Hover me</Button>
    </Tooltip>
  ),
  args: {}
}

export const TooltipIconDemo: Story = {
  render: (args) => <TooltipIcon {...args} tooltip="Icon tooltip" />,
  args: {}
}
