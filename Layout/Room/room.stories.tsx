import type { Meta, StoryObj } from "@storybook/react"
import Room, { HiddenRoom } from "./index"
import Button from "@/ui/Actions/Button"
import { useState } from "react"
import Brick from "../Brick"
import Stack from "../Stack"

const meta: Meta<typeof Room> = {
  title: "UI/Layout/Room",
  component: Room,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Room is a layout section with animation support. HiddenRoom animates conditional content inside a Room."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    children: { control: false }
  },
  tags: ["autodocs"]
}
export default meta
type Story = StoryObj<typeof Room>

export const Default: Story = {
  args: {
    children: (
      <Brick>
        <h3>Room Section</h3>
        <p>This is a basic Room with some content.</p>
      </Brick>
    )
  }
}

export const WithCustomClass: Story = {
  args: {
    className: "bg-blue-100 p-6 rounded-xl",
    children: (
      <Brick>
        <h3>Custom Styled Room</h3>
        <p>This Room uses custom Tailwind classes.</p>
      </Brick>
    )
  }
}

export const AnimatedHiddenRoom: Story = {
  render: () => {
    const [show, setShow] = useState(true)
    return (
      <Room className="bg-gray-100 p-6 rounded-xl min-w-[300px] min-h-[120px]">
        <Stack>
          <Room>
            <Button onClick={() => setShow((s) => !s)}>
              Toggle HiddenRoom
            </Button>
          </Room>
          <HiddenRoom isShown={show}>
            <Brick>This content animates in/out!</Brick>
          </HiddenRoom>
          <Room>
            <Brick>This is another Room</Brick>
          </Room>
        </Stack>
      </Room>
    )
  }
}
