import type { Meta, StoryObj } from "@storybook/react"
import Beam from "./index"
import Brick from "../Brick"
import Pillar from "../Pillar"

const meta: Meta<typeof Beam> = {
  title: "UI/Layout/Beam",
  component: Beam,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Beam component is a flexible layout container. Main function is to be a row in a grid system and set up grid properties for its children Pillar components. You can see a detailed explanation in the Pillar component documentation. Here all of the Pillar components have a same col value equal to 3."
      }
    }
  },
  argTypes: {
    cols: { control: { type: "number", min: 1, max: 12 }, defaultValue: 12 },
    isWithoutWrap: { control: "boolean" },
    className: { control: "text" },
    children: { control: false }
  },
  tags: ["autodocs"]
}
export default meta
type Story = StoryObj<typeof Beam>

export const Default: Story = {
  args: {
    className: "gap-close",
    children: [
      <Pillar key="1" md={3}>
        <Brick>Item 1</Brick>
      </Pillar>,
      <Pillar key="2" md={3}>
        <Brick>Item 2</Brick>
      </Pillar>,
      <Pillar key="3" md={3}>
        <Brick>Item 3</Brick>
      </Pillar>,
      <Pillar key="4" md={3}>
        <Brick>Item 4</Brick>
      </Pillar>,
      <Pillar key="5" md={3}>
        <Brick>Item 5</Brick>
      </Pillar>,
      <Pillar key="6" md={3}>
        <Brick>Item 6</Brick>
      </Pillar>
    ]
  }
}

export const NoWrap: Story = {
  args: {
    className: "gap-close",
    isWithoutWrap: true,
    children: [
      <Pillar key="1" md={3}>
        <Brick>Item 1</Brick>
      </Pillar>,
      <Pillar key="2" md={3}>
        <Brick>Item 2</Brick>
      </Pillar>,
      <Pillar key="3" md={3}>
        <Brick>Item 3</Brick>
      </Pillar>,
      <Pillar key="4" md={3}>
        <Brick>Item 4</Brick>
      </Pillar>,
      <Pillar key="5" md={3}>
        <Brick>Item 5</Brick>
      </Pillar>,
      <Pillar key="6" md={3}>
        <Brick>Item 6</Brick>
      </Pillar>
    ]
  }
}
export const SixColumns: Story = {
  args: {
    className: "gap-close",
    cols: 6,
    children: [
      <Pillar key="1" md={3}>
        <Brick>Item 1</Brick>
      </Pillar>,
      <Pillar key="2" md={3}>
        <Brick>Item 2</Brick>
      </Pillar>,
      <Pillar key="3" md={3}>
        <Brick>Item 3</Brick>
      </Pillar>,
      <Pillar key="4" md={3}>
        <Brick>Item 4</Brick>
      </Pillar>,
      <Pillar key="5" md={3}>
        <Brick>Item 5</Brick>
      </Pillar>,
      <Pillar key="6" md={3}>
        <Brick>Item 6</Brick>
      </Pillar>
    ]
  }
}
