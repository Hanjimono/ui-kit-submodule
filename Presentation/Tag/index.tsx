"use client"
// System
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
// Ui
import Button from "@/ui/Actions/Button"
import Text from "@/ui/Presentation/Text"
import Tooltip from "@/ui/Presentation/Tooltip"
// Styles and types
import { TagProps } from "./types"
import styles from "./styles.module.scss"

/**
 * A functional component that renders a tag with optional close button.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.className] - Additional class names for the tag container.
 * @param {string} props.title - The title text to display inside the tag.
 * @param {function} [props.onClose] - Callback function to handle the close button click event.
 * @param {string} [props.color] - Background color of the tag.
 * @param {number} [props.maxWidth=100] - Maximum width of the tag in pixels.
 * @param {string} [props.size="small"] - Size of the text inside the tag.
 * @param {boolean} [props.borderless] - If true, renders the tag without a border.
 * @param {any} [props.value] - Value associated with the tag, passed to the onClose callback.
 * @param {function} [props.onClick] - Callback function to handle the tag click event.
 *
 * @returns {JSX.Element} The rendered tag component.
 */
export function Tag({
  className,
  title,
  onClose,
  color,
  maxWidth = 100,
  size = "small",
  borderless,
  value,
  onClick
}: TagProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const [isTextOverflowing, setIsTextOverflowing] = useState(false)

  useEffect(() => {
    if (textRef.current) {
      setIsTextOverflowing(textRef.current.scrollWidth > maxWidth)
    }
  }, [maxWidth, title])

  const calculatedClassNames = clsx(
    styles["tag-container"],
    className,
    borderless && styles["borderless"]
  )
  const calculatedStyle = {
    maxWidth: `${maxWidth}px`,
    backgroundColor: color
  }
  return (
    <div
      ref={textRef}
      style={calculatedStyle}
      className={calculatedClassNames}
      onClick={onClick}
    >
      <Text type="fit-line" size={size}>
        <Tooltip
          tooltipId={(value || title) + "-tooltip"}
          tooltip={title}
          place="bottom"
          forceHide={!isTextOverflowing}
        >
          {title}
        </Tooltip>
      </Text>
      {onClose && (
        <Button
          className={styles["tag-close"]}
          onClick={() => onClose(value)}
          icon="clear"
          remove
          text
        />
      )}
    </div>
  )
}

export default Tag
