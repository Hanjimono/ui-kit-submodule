import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import TagLine from "./index"

const meta: Meta<typeof TagLine> = {
  title: "UI/Actions/TagLine",
  component: TagLine,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "TagLine renders a list of tags with options to create, select, deselect, and delete tags."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    selectedTagIds: { control: false },
    allAvailableTagList: { control: false },
    onCreateTag: { action: "createTag" },
    onSelectTag: { action: "selectTag" },
    onDeselectTag: { action: "deselectTag" },
    onDeleteTag: { action: "deleteTag" },
    isOnlyDisplay: { control: "boolean" }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof TagLine>

const demoTags = [
  { id: 1, title: "React", color: "blue" },
  { id: 2, title: "Next.js", color: "green" },
  { id: 3, title: "Storybook", color: "purple" },
  { id: 4, title: "Tailwind", color: "cyan" },
  { id: 5, title: "Design System", color: "yellow" }
]

function useDemoTagLineState() {
  const [selectedTagIds, setSelectedTagIds] = useState([1, 2])
  const handleCreateTag = (title: string) => {
    // Demo: just add a new tag with next id
    demoTags.push({ id: demoTags.length + 1, title, color: "gray" })
  }
  const handleSelectTag = (id: number) => {
    setSelectedTagIds((ids) => [...ids, id])
  }
  const handleDeselectTag = (id: number) => {
    setSelectedTagIds((ids) => ids.filter((tagId) => tagId !== id))
  }
  const handleDeleteTag = (id: number) => {
    setSelectedTagIds((ids) => ids.filter((tagId) => tagId !== id))
  }
  return {
    selectedTagIds,
    allAvailableTagList: demoTags,
    onCreateTag: handleCreateTag,
    onSelectTag: handleSelectTag,
    onDeselectTag: handleDeselectTag,
    onDeleteTag: handleDeleteTag
  }
}

export const Default: Story = {
  render: (args) => {
    const tagLineState = useDemoTagLineState()
    return <TagLine {...args} {...tagLineState} />
  },
  args: {
    className: "w-96",
    isOnlyDisplay: false
  }
}

export const DisplayOnly: Story = {
  render: (args) => {
    const tagLineState = useDemoTagLineState()
    return <TagLine {...args} {...tagLineState} isOnlyDisplay />
  },
  args: {
    className: "w-96"
  }
}

export const WithCustomClass: Story = {
  render: (args) => {
    const tagLineState = useDemoTagLineState()
    return (
      <TagLine
        {...args}
        {...tagLineState}
        className="bg-blue-50 border-blue-400"
      />
    )
  },
  args: {
    className: "w-96"
  }
}
