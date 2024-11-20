"use client"
// System
import { cva, cx } from "class-variance-authority"
// Ui
import Brick from "@/ui/Layout/Brick"
import Button from "@/ui/Actions/Button"
import { smartCvaWrapper } from "@/ui/Skeleton/utils"
// Styles and types
import { ActionPanelProps } from "./types"

/**
 * ActionPanel component renders a panel with action buttons.
 * All button is just an icons. You can provide a tooltip for buttons, so the user can see the description of the button.
 *
 * @param {string} [props.className] - Additional class names to apply to the panel.
 * @param {string} [props.orientation="horizontal"] - Orientation of the action panel, can be "horizontal" or "vertical".
 * @param {Array} props.items - Array of items to render as buttons in the start section.
 * @param {Array} props.endItems - Array of items to render as buttons in the end section.
 * @param {boolean} [props.isNoPadding] - If true, the panel will have no padding.
 */
function ActionPanel({
  className,
  orientation = "horizontal",
  items,
  endItems,
  isNoPadding
}: ActionPanelProps) {
  const calculatedClassNames = smartCvaWrapper(
    actionPanelStyles,
    {
      padding: !isNoPadding,
      orientation
    },
    className
  )
  return (
    <Brick className={calculatedClassNames} noPadding>
      <div
        className={cx(
          "flex gap-close",
          orientation == "vertical" && "flex-col"
        )}
      >
        {items &&
          items.map((item, index) => (
            <Button
              key={index}
              className={"rounded-lg"}
              iconSize={28}
              {...item}
            />
          ))}
      </div>
      {endItems && (
        <div
          className={cx(
            "flex gap-close",
            orientation == "vertical" && "flex-col"
          )}
        >
          {endItems.map((item, index) => (
            <Button key={index} className={"rounded-lg"} {...item} />
          ))}
        </div>
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
      default: "p-3",
      unset: ""
    }
  }
})

export default ActionPanel
