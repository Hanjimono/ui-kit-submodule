import type { Meta, StoryObj } from "@storybook/react"
import Pillar from "./index"
import Beam from "../Beam"
import Brick from "../Brick"

const meta: Meta<typeof Pillar> = {
  title: "UI/Layout/Pillar",
  component: Pillar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Pillar component is a flexible layout column for grid systems. These stories demonstrate different column spans (cols) in a 12-column grid, each Pillar containing a Brick."
      }
    }
  },
  argTypes: {
    md: { control: { type: "number", min: 1, max: 12 }, defaultValue: 3 },
    className: { control: "text" },
    children: { control: false }
  },
  tags: ["autodocs"]
}
export default meta
type Story = StoryObj<typeof Pillar>

export const Cols3: Story = {
  render: () => (
    <Beam className="gap-close">
      <Pillar md={3}>
        <Brick>md=3</Brick>
      </Pillar>
      <Pillar md={3}>
        <Brick>md=3</Brick>
      </Pillar>
      <Pillar md={3}>
        <Brick>md=3</Brick>
      </Pillar>
      <Pillar md={3}>
        <Brick>md=3</Brick>
      </Pillar>
    </Beam>
  )
}

export const Cols4: Story = {
  render: () => (
    <Beam className="gap-close">
      <Pillar md={4}>
        <Brick>md=4</Brick>
      </Pillar>
      <Pillar md={4}>
        <Brick>md=4</Brick>
      </Pillar>
      <Pillar md={4}>
        <Brick>md=4</Brick>
      </Pillar>
    </Beam>
  )
}

export const Cols6: Story = {
  render: () => (
    <Beam className="gap-close">
      <Pillar md={6}>
        <Brick>md=6</Brick>
      </Pillar>
      <Pillar md={6}>
        <Brick>md=6</Brick>
      </Pillar>
    </Beam>
  )
}

export const Cols12: Story = {
  render: () => (
    <Beam className="gap-close">
      <Pillar md={12}>
        <Brick>md=12</Brick>
      </Pillar>
      <Pillar md={12}>
        <Brick>md=12</Brick>
      </Pillar>
    </Beam>
  )
}

export const Mixed: Story = {
  render: () => (
    <Beam className="gap-close">
      <Pillar md={6}>
        <Brick>md=6</Brick>
      </Pillar>
      <Pillar md={3}>
        <Brick>md=3</Brick>
      </Pillar>
      <Pillar md={3}>
        <Brick>md=3</Brick>
      </Pillar>
      <Pillar md={4}>
        <Brick>md=4</Brick>
      </Pillar>
      <Pillar md={4}>
        <Brick>md=4</Brick>
      </Pillar>
      <Pillar md={4}>
        <Brick>md=4</Brick>
      </Pillar>
    </Beam>
  )
}
