// System
import clsx from "clsx"
// Styles and types
import { TagLineProps, TagElement } from "./types"
import styles from "./styles.module.scss"
import { useMemo } from "react"
import Tag from "@/ui/Presentation/Tag"
import { i } from "framer-motion/client"

function TagLine<TagType extends TagElement>({
  className,
  selectedTagIds,
  allAvailableTagList,
  onCreateTag,
  onSelectTag,
  onDeselectTag,
  onDeleteTag,
  isOnlyDisplay
}: TagLineProps<TagType>) {
  const calculatedClassNames = clsx(
    styles["tag-line"],
    className,
    !isOnlyDisplay && styles["allow-edit"]
  )
  const selectedTags = useMemo(() => {
    return allAvailableTagList.filter((tag) => selectedTagIds.includes(tag.id))
  }, [selectedTagIds, allAvailableTagList])
  return (
    <div className={calculatedClassNames}>
      {selectedTags.map((tag) => {
        return (
          <Tag
            title={tag.title}
            color={tag.color}
            value={tag.id}
            key={tag.id}
            onClose={onDeselectTag ? () => onDeselectTag(tag.id) : undefined}
            borderless
          />
        )
      })}
    </div>
  )
}
export default TagLine
