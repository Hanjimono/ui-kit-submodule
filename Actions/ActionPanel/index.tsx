"use client"
// System
import clsx from "clsx"
// Ui
import Brick from "@/ui/Layout/Brick"
import Button from "@/ui/Actions/Button"
import Room from "@/ui/Layout/Room"
// Styles and types
import { ActionPanelProps } from "./types"
import styles from "./styles.module.scss"

/**
 * ActionPanel component renders a panel with action buttons.
 * All button is just an icons. You can provide a tooltip for buttons, so the user can see the description of the button.
 *
 * @param {string} [props.className] - Additional class names to apply to the panel.
 * @param {string} [props.orientation="horizontal"] - Orientation of the action panel, can be "horizontal" or "vertical".
 * @param {Array} props.items - Array of items to render as buttons in the start section.
 * @param {Array} props.endItems - Array of items to render as buttons in the end section.
 */
function ActionPanel({
  className,
  orientation = "horizontal",
  items,
  endItems
}: ActionPanelProps) {
  const calculatedClassNames = clsx(
    styles["action-panel"],
    className,
    orientation && styles[orientation]
  )
  return (
    <Brick className={calculatedClassNames} noPadding>
      <Room className={styles["start-actions"]}>
        {items &&
          items.map((item, index) => (
            <Button
              key={index}
              className={styles["action-panel-item"]}
              iconSize={28}
              {...item}
            />
          ))}
      </Room>
      {endItems && (
        <Room className={styles["end-actions"]}>
          {endItems.map((item, index) => (
            <Button
              key={index}
              className={styles["action-panel-item"]}
              {...item}
            />
          ))}
        </Room>
      )}
    </Brick>
  )
}
export default ActionPanel
