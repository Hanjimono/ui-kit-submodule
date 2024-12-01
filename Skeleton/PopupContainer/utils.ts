import { CSSProperties } from "react"

/**
 * Calculates the styles for positioning a popup container relative to its parent element.
 *
 * @param style - The initial CSS properties to apply to the popup container.
 * @param parentPositionSettings - The bounding rectangle of the parent element.
 * @param autoReposition - Whether to automatically reposition the popup if it goes out of bounds.
 * @param positionDirection - The preferred direction to position the popup relative to the parent element.
 * @param positionVerticalOffset - The vertical offset to apply to the popup position.
 * @param positionHorizontalOffset - The horizontal offset to apply to the popup position.
 * @param popupHeight - The height of the popup container.
 * @param popupWidth - The width of the popup container.
 * @returns A tuple containing the calculated styles and the final position direction.
 */
export function calculateStyles(
  style: CSSProperties = {},
  parentPositionSettings: DOMRect | undefined,
  autoReposition: boolean = false,
  positionDirection: "top" | "bottom" | "left" | "right" | undefined,
  positionVerticalOffset: number = 0,
  positionHorizontalOffset: number = 0,
  popupHeight: number,
  popupWidth: number
): [CSSProperties, "top" | "bottom" | "left" | "right" | undefined] {
  /** The final position direction */
  let formattedPosition = positionDirection
  const styles: CSSProperties = { ...style }

  if (!parentPositionSettings) {
    return [styles, formattedPosition]
  }

  /**
   * Calculates the absolute position of a container relative to its parent element.
   *
   * @param topOrLeftParentPosition - The top or left position of the parent element.
   * @param bottomOrRightParentPosition - The bottom or right position of the parent element.
   * @param containerWidthOrHeight - The width or height of the container.
   * @param offset - The offset to apply to the position calculation. Defaults to 0.
   * @returns The calculated absolute position of the container.
   */
  const calculateAbsolutePosition = (
    topOrLeftParentPosition: number,
    bottomOrRightParentPosition: number,
    containerWidthOrHeight: number,
    offset: number = 0
  ) => {
    const topOrLeftContainerPosition =
      topOrLeftParentPosition - containerWidthOrHeight - offset
    const rightOrBottomContainerPosition = bottomOrRightParentPosition + offset

    // If auto-repositioning is disabled, return the calculated position
    if (!autoReposition) {
      return positionDirection === "top" || positionDirection === "left"
        ? topOrLeftContainerPosition
        : rightOrBottomContainerPosition
    }

    // If the position direction is top or left and the calculated position is less than 0, change position direction
    if (positionDirection === "top" || positionDirection === "left") {
      if (topOrLeftContainerPosition < 0) {
        // Change the formatted position to the opposite direction
        formattedPosition = positionDirection === "top" ? "bottom" : "right"
        return rightOrBottomContainerPosition
      }
      return topOrLeftContainerPosition
    }

    // If the position direction is bottom or right and the calculated position is greater than the window size, change position direction
    if (positionDirection === "bottom" || positionDirection === "right") {
      if (
        rightOrBottomContainerPosition + containerWidthOrHeight >
        (positionDirection === "bottom"
          ? window.innerHeight
          : window.innerWidth)
      ) {
        // Change the formatted position to the opposite direction
        formattedPosition = positionDirection === "bottom" ? "top" : "left"
        return topOrLeftContainerPosition
      }
      return rightOrBottomContainerPosition
    }
  }

  if (positionDirection === "top" || positionDirection === "bottom") {
    styles.top = calculateAbsolutePosition(
      parentPositionSettings.top,
      parentPositionSettings.bottom,
      popupHeight,
      positionVerticalOffset
    )
    styles.left = parentPositionSettings.left + positionHorizontalOffset
  }

  if (positionDirection === "left" || positionDirection === "right") {
    styles.left = calculateAbsolutePosition(
      parentPositionSettings.left,
      parentPositionSettings.right,
      popupWidth,
      positionHorizontalOffset
    )
    styles.top = parentPositionSettings.top + positionVerticalOffset
  }

  return [styles, formattedPosition]
}
