import { PlacesType, VariantType } from "react-tooltip"
import { IconType } from "@/ui/Presentation/Icon/types"

/** Tooltip component that displays a tooltip when hovering over the child elements. */
export interface TooltipProps {
  /** React children */
  children?: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Tooltip content */
  tooltip: string | React.ReactNode
  /** Unique identifier for the tooltip */
  tooltipId?: string
  /** Position of the tooltip */
  place?: PlacesType
  /** Variant of the tooltip */
  variant?: VariantType
  /** Whether the tooltip is styled */
  styled?: boolean
  /** Force to not show a tooltip */
  forceHide?: boolean
}

/** TooltipIcon component renders an icon inside a tooltip. */
export interface TooltipIconProps extends TooltipProps {
  /** Icon name */
  icon?: string
  /** Icon size */
  iconSize?: number
  /** Icon height */
  iconHeight?: number
  /** Type of the icon */
  iconType?: IconType
}
