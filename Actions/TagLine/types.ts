export interface TagElement {
  id: number
  title: string
  color: string
}

export interface TagLineProps<Tag extends TagElement> {
  /** Classes */
  className?: string
  selectedTagIds: number[]
  allAvailableTagList: Tag[]
  onSelectTag: (tagId: number) => void
  onDeselectTag?: (tagId: number) => void
  onDeleteTag?: (tagId: number) => void
  onCreateTag: (tag: Tag) => void
  isOnlyDisplay?: boolean
}
