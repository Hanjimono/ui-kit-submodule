import { CSSProperties, useMemo } from "react"

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
export function useCalculateStyles(
  style: CSSProperties = {},
  parentPositionSettings: DOMRect | undefined,
  autoReposition: boolean = false,
  positionDirection: "top" | "bottom" | "left" | "right" | undefined,
  positionVerticalOffset: number = 0,
  positionHorizontalOffset: number = 0,
  popupHeight: number,
  popupWidth: number
): [CSSProperties, "top" | "bottom" | "left" | "right" | undefined] {
  return useMemo(() => {
    /** The final position direction */
    let formattedPosition = positionDirection
    const styles: CSSProperties = { ...style }

    if (!parentPositionSettings) {
      return [styles, formattedPosition]
    }

    const calculateTopPosition = () => {
      // Default position is equal to the top position of the parent element plus the defined vertical offset
      let defaultTopPosition =
        parentPositionSettings.top + positionVerticalOffset
      // If we calculate top position for left and right directions we just need to check if the popup goes out of bounds to the bottom
      if (positionDirection === "left" || positionDirection == "right") {
        if (!autoReposition) {
          return defaultTopPosition
        }
        if (defaultTopPosition + popupHeight > window.innerHeight) {
          return (
            parentPositionSettings.bottom - popupHeight - positionVerticalOffset
          )
        }
        return defaultTopPosition
      }
      const maxTopPosition =
        parentPositionSettings.top - popupHeight - positionVerticalOffset
      const minTopPosition =
        parentPositionSettings.bottom + positionVerticalOffset
      // For top and bottom directions we need to place the popup above or below the parent element
      if (!autoReposition) {
        return positionDirection === "top" ? maxTopPosition : minTopPosition
      }
      // If the popup goes out of bounds we change the position direction
      if (positionDirection === "top") {
        if (maxTopPosition < 0) {
          formattedPosition = "bottom"
          return minTopPosition
        }
        // Popup fits in the window, return the position above the parent element
        return defaultTopPosition
      }
      // Same goes for the bottom direction
      if (minTopPosition + popupHeight > window.innerHeight) {
        formattedPosition = "top"
        return maxTopPosition
      }
      // Popup fits in the window, return the position below the parent element
      return minTopPosition
    }

    const calculateLeftPosition = () => {
      // Default position is equal to the left position of the parent element plus the defined horizontal offset
      let defaultLeftPosition =
        parentPositionSettings.left + positionHorizontalOffset
      // If we calculate left position for top and bottom directions we just need to check if the popup goes out of bounds to the right
      if (positionDirection === "top" || positionDirection == "bottom") {
        if (!autoReposition) {
          return defaultLeftPosition
        }
        if (defaultLeftPosition + popupWidth > window.innerWidth) {
          return (
            parentPositionSettings.right - popupWidth - positionHorizontalOffset
          )
        }
        return defaultLeftPosition
      }
      const maxLeftPosition =
        parentPositionSettings.left - popupWidth - positionHorizontalOffset
      const minLeftPosition =
        parentPositionSettings.right + positionHorizontalOffset
      // For left and right directions we need to place the popup to the left or right of the parent element
      if (!autoReposition) {
        return positionDirection === "left" ? maxLeftPosition : minLeftPosition
      }
      // If the popup goes out of bounds we change the position direction
      if (positionDirection === "left") {
        if (maxLeftPosition < 0) {
          formattedPosition = "right"
          return minLeftPosition
        }
        // Popup fits in the window, return the position to the left of the parent element
        return defaultLeftPosition
      }
      // Same goes for the right direction
      if (minLeftPosition + popupWidth > window.innerWidth) {
        formattedPosition = "left"
        return maxLeftPosition
      }
      // Popup fits in the window, return the position to the right of the parent element
      return minLeftPosition
    }

    styles.top = calculateTopPosition()
    styles.left = calculateLeftPosition()
    return [styles, formattedPosition]
  }, [
    autoReposition,
    style,
    parentPositionSettings,
    positionDirection,
    positionVerticalOffset,
    positionHorizontalOffset,
    popupHeight,
    popupWidth
  ])
}
