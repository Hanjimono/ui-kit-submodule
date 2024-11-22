// System
import { cx } from "class-variance-authority"
import { Tooltip as ReactTooltip } from "react-tooltip"
// Ui
import Icon from "@/ui/Presentation/Icon"
// Styles and types
import { TooltipIconProps, TooltipProps } from "./types"
import { twMerge } from "tailwind-merge"

/**
 * Tooltip component that displays a tooltip when hovering over the child elements.
 *
 * @param {React.ReactNode} children - The content that will trigger the tooltip on hover.
 * @param {string} [className] - Additional class names to apply to the tooltip container.
 * @param {string} [tooltipId] - Unique identifier for the tooltip. If not provided, a random ID will be generated.
 * @param {string} tooltip - The content to display inside the tooltip.
 * @param {string} [place="right"] - The position of the tooltip relative to the target element. Defaults to "right".
 * @param {string} [variant="dark"] - The visual style of the tooltip. Defaults to "dark".
 * @param {boolean} [styled] - Flag to apply additional styling to the tooltip.
 * @param {boolean} [forceHide] - Flag to force the tooltip to not show.
 *
 * @returns {JSX.Element} The rendered Tooltip component.
 */
export function Tooltip({
  children,
  className,
  tooltipId,
  tooltip,
  place = "right",
  variant = "dark",
  styled,
  forceHide
}: TooltipProps) {
  if (forceHide) {
    return <>{children}</>
  }
  if (!tooltipId) {
    tooltipId = Math.random().toString(36).substr(2, 9)
  }
  const calculatedClassNames = twMerge(
    cx("tooltip", styled && "border-b border-gray-500 border-dashed", className)
  )
  return (
    <span
      data-tooltip-id={tooltipId}
      data-tooltip-place={place}
      data-tooltip-offset={10}
      className={calculatedClassNames}
      data-tooltip-variant={variant}
    >
      {children}
      <ReactTooltip style={{ zIndex: "var(--zIndexUnderMask)" }} id={tooltipId}>
        {tooltip}
      </ReactTooltip>
    </span>
  )
}
export default Tooltip

/**
 * TooltipIcon component renders an icon inside a tooltip.
 *
 * @param {string} [icon="help"] - The name of the icon to be displayed.
 * @param {string} [iconType="md"] - The type of the icon (e.g., material design).
 * @param {number} [iconSize=18] - The width of the icon.
 * @param {number} [iconHeight=18] - The height of the icon.
 * @param {TooltipIconProps} rest - Additional props to be passed to the Tooltip component.
 * @returns {JSX.Element} The rendered TooltipIcon component.
 */
export function TooltipIcon({
  icon = "help",
  iconType = "md",
  iconSize = 18,
  iconHeight = 18,
  ...rest
}: TooltipIconProps) {
  return (
    <Tooltip {...rest}>
      <Icon
        name={icon}
        alt={icon}
        type={iconType}
        customIconLink={icon}
        width={iconSize}
        height={iconHeight}
      />
    </Tooltip>
  )
}
