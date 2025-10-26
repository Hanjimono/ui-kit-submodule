"use client"
// System
import { cva, cx } from "class-variance-authority"
// Ui
import Brick from "@/ui/Layout/Brick"
import Button from "@/ui/Actions/Button"
import { formatClassnames, smartCvaWrapper } from "@/ui/Skeleton/utils"
// Styles and types
import { ActionPanelProps } from "./types"
import Stack from "@/ui/Layout/Stack"

/**
 * ActionPanel component renders a panel with action buttons.
 * All button is just an icons. You can provide a tooltip for buttons, so the user can see the description of the button.
 *
 * @param {string} [props.className] - Additional class names to apply to the panel.
 * @param {string} [props.orientation="horizontal"] - Orientation of the action panel, can be "horizontal" or "vertical".
 * @param {Array} props.items - Array of items to render as buttons in the start section.
 * @param {Array} props.endItems - Array of items to render as buttons in the end section.
 * @param {boolean} [props.isNoPadding] - If true, the panel will have no padding.
 * @param {string} [props.gap] - Gap between buttons.
 */
function ActionPanel({
  className,
  orientation = "horizontal",
  items,
  endItems,
  isNoPadding,
  gap
}: ActionPanelProps) {
  const calculatedClassNames = smartCvaWrapper(
    actionPanelStyles,
    {
      padding: !isNoPadding,
      orientation
    },
    "gap-" + gap,
    className
  )
  return (
    <Brick className={calculatedClassNames} noPadding>
      <Stack
        className={cx("flex", orientation == "horizontal" && "flex-row")}
        gap={gap}
      >
        {items &&
          items.map((item, index) => (
            <Button
              key={index}
              className={formatClassnames("rounded-lg", item.className)}
              iconSize={28}
              {...item}
              isText
            />
          ))}
      </Stack>
      {endItems && (
        <Stack
          className={cx(
            "flex justify-center items-center",
            orientation == "horizontal" && "flex-row"
          )}
        >
          {endItems.map((item, index) => (
            <Button key={index} className={"rounded-lg"} {...item} isText />
          ))}
        </Stack>
      )}
    </Brick>
  )
}

const actionPanelStyles = cva("action-panel flex justify-between", {
  variants: {
    orientation: {
      horizontal: "flex-row w-full h-auto",
      vertical: "flex-col h-full w-fit"
    },
    padding: {
      default: "p-panel",
      unset: ""
    }
  }
})

export default ActionPanel
