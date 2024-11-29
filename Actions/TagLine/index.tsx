// System
import { twMerge } from "tailwind-merge"
import { cx } from "class-variance-authority"
import { useCallback, useMemo, useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
// Store
import { useStore } from "@/store"
// Ui
import Tag from "@/ui/Presentation/Tag"
import PopupContainer from "@/ui/Skeleton/PopupContainer"
import Button from "@/ui/Actions/Button"
import Text from "@/ui/Presentation/Text"
import Portal from "@/ui/Skeleton/Portal"
// Styles and types
import { TagLineProps, TagElement } from "./types"

const GAP_BETWEEN_TAGLINE_AND_MENU = 5

/**
 * TagLine component renders a list of tags with options to create, select, deselect, and delete tags.
 * It also provides a UI for displaying tags in a flexible and interactive manner.
 *
 * @template TagType - The type of the tag element.
 * @param {string} className - Additional class names for styling the component.
 * @param {number[]} selectedTagIds - List of selected tag IDs.
 * @param {TagType[]} allAvailableTagList - List of all available tags.
 * @param {Function} onCreateTag - Callback function to create a new tag.
 * @param {Function} onSelectTag - Callback function to select a tag.
 * @param {Function} onDeselectTag - Callback function to deselect a tag.
 * @param {Function} onDeleteTag - Callback function to delete a tag.
 * @param {boolean} isOnlyDisplay - Flag to indicate if the component is in display-only mode.
 * @returns {JSX.Element | null} The rendered TagLine component or null if in display-only mode with no selected tags.
 */
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
  const confirm = useStore((state) => state.confirm)
  const calculatedClassNames = twMerge(
    cx(
      "tag-line w-full cursor-default flex gap-almost-same p-2 rounded-lg",
      "overflow-y-auto flex-wrap max-h-24 min-h-10 items-center",
      className,
      !isOnlyDisplay &&
        "cursor-pointer hover:border-opacity-100 border border-opacity-50 border-form-border border-dashed "
    )
  )
  const tagLineRef = useRef<HTMLDivElement>(null)
  const [isOptionMenuShown, setIsOptionMenuShown] = useState(false)
  const [tagLinePosition, setTagLinePosition] = useState<DOMRect | undefined>(
    undefined
  )
  const selectedTags = useMemo(() => {
    return allAvailableTagList.filter((tag) => selectedTagIds.includes(tag.id))
  }, [selectedTagIds, allAvailableTagList])
  const handleOpenOptionMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOnlyDisplay) {
      return
    }
    const target = e.target as HTMLElement
    if (target && target.closest && target.closest(".tag-close")) {
      return
    }
    if (isOnlyDisplay) {
      return
    }
    setTagLinePosition(tagLineRef.current?.getBoundingClientRect() ?? undefined)
    setIsOptionMenuShown(true)
  }
  if (isOnlyDisplay && selectedTags.length == 0) {
    return null
  }
  const handleDeleteTag = (tagId: number) => {
    if (onDeleteTag) {
      confirm(
        "Are you sure you want to delete this tag? It will be deleted from any place where you use it.",
        {
          title: "Delete tag",
          onConfirm: () => onDeleteTag(tagId)
        }
      )
    }
  }
  return (
    <div
      className={calculatedClassNames}
      ref={tagLineRef}
      onClick={handleOpenOptionMenu}
    >
      {selectedTags.map((tag) => {
        return (
          <Tag
            title={tag.title}
            color={tag.color}
            value={tag.id}
            key={tag.id}
            onClose={
              onDeselectTag && !isOnlyDisplay
                ? () => onDeselectTag(tag.id)
                : undefined
            }
            borderless
          />
        )
      })}
      {selectedTags.length == 0 && (
        <div className="text-white opacity-50 text-center w-full">
          Click here to add a tag.
        </div>
      )}
      <Portal>
        <AnimatePresence>
          {isOptionMenuShown && (
            <PopupContainer
              isActive={isOptionMenuShown}
              className="bg-form-main p-2 rounded-lg overflow-hidden"
              onClose={() => setIsOptionMenuShown(false)}
              animationProps={{
                initial: { scale: 0.8, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                exit: { scale: 0.8, opacity: 0, pointerEvents: "none" },
                transition: { scale: { bounce: 0, duration: 0.2 } }
              }}
              checkOuterClick
              excludeClickListenerList={[
                ".tag-line-menu",
                ".tag-close",
                ".tag",
                ".confirm"
              ]}
              parentPositionSettings={tagLinePosition}
              positionDirection={"bottom"}
              positionOffset={GAP_BETWEEN_TAGLINE_AND_MENU}
              autoReposition
            >
              <TagLineMenu
                selectedTagIds={selectedTagIds}
                allAvailableTagList={allAvailableTagList}
                onCreateTag={onCreateTag}
                onSelectTag={onSelectTag}
                onDeleteTag={handleDeleteTag}
                isOnlyDisplay={isOnlyDisplay}
              />
            </PopupContainer>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  )
}

/**
 * A component that renders a menu for selecting, creating, and deleting tags.
 *
 * @template TagType - The type of the tag element.
 * @param {TagLineProps<TagType>} props - The properties for the TagLineMenu component.
 * @param {number[]} props.selectedTagIds - The list of selected tag IDs.
 * @param {TagType[]} props.allAvailableTagList - The list of all available tags.
 * @param {(tag: string) => void} props.onCreateTag - The callback function to create a new tag.
 * @param {(tagId: number) => void} props.onSelectTag - The callback function to select a tag.
 * @param {(tagId: number) => void} props.onDeleteTag - The callback function to delete a tag.
 * @returns {JSX.Element} The rendered TagLineMenu component.
 */
function TagLineMenu<TagType extends TagElement>({
  selectedTagIds,
  allAvailableTagList,
  onCreateTag,
  onSelectTag,
  onDeleteTag
}: TagLineProps<TagType>) {
  const [newTag, setNewTag] = useState("")
  const filteredTags = useMemo(() => {
    return allAvailableTagList.filter(
      (tag) =>
        tag.title.toLowerCase().includes(newTag.toLowerCase()) &&
        !selectedTagIds.includes(tag.id)
    )
  }, [newTag, allAvailableTagList, selectedTagIds])
  const handleSelectTag = (
    e: React.MouseEvent<HTMLDivElement>,
    tagId: number
  ) => {
    const target = e.target as HTMLElement
    if (target && target.closest && target.closest(".tag-close")) {
      return
    }
    if (onSelectTag) {
      onSelectTag(tagId)
    }
  }
  const handleCreateTag = useCallback(() => {
    onCreateTag(newTag.toLocaleLowerCase())
    setNewTag("")
  }, [newTag, onCreateTag])
  return (
    <div className="tag-line-menu flex flex-col">
      <div className="flex w-full h-10 items-center">
        <input
          name="tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          type="text"
          className=" border-b border-form-border p-2 flex-1 outline-none bg-form-main"
          placeholder="Start typing to create new tag or filter by existing"
        />
        {newTag && (
          <Button className="rounded-none" onClick={handleCreateTag} success>
            Save
          </Button>
        )}
      </div>
      <div className="flex flex-col py-4 gap-almost-same max-h-48 overflow-y-auto">
        {filteredTags.map((tag) => {
          return (
            <div
              className="hover:bg-secondary-main px-2 py-1 cursor-pointer"
              key={tag.id}
              onClick={(e) => handleSelectTag(e, tag.id)}
            >
              <Tag
                className="cursor-pointer"
                borderless
                title={tag.title}
                color={tag.color}
                value={tag.id}
                onClose={onDeleteTag}
              />
            </div>
          )
        })}
        {filteredTags.length == 0 && (
          <div className="text-white opacity-50 text-center p-4">
            There are no tags matching your search criteria.
          </div>
        )}
      </div>
      <Text className="opacity-50 pt-1" size="extra-small">
        Select an option or create a new one
      </Text>
    </div>
  )
}
export default TagLine
