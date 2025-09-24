import { IconType } from "@/ui/Presentation/Icon/types"
import { ButtonProps } from "@/ui/Actions/Button/types"
import { PossibleGapVariants } from "@/ui/Layout/Stack/types"

type Orientation = "horizontal" | "vertical"

interface Action extends ButtonProps {
  /** Function called when the button is clicked */
  onClick?: (e: React.BaseSyntheticEvent) => void
  /** Name of the icon displayed on the button */
  icon?: string
  /** Type of icon displayed on the button. Defaults to "material-icons" */
  iconType?: IconType
  /** Button behaves like a link */
  link?: string
  /** Target attribute for link button */
  target?: string
}

export interface ActionPanelProps {
  /** Classes */
  className?: string
  /** Items to render in the start section */
  items: Action[]
  /** Items to render in the end section */
  endItems?: Action[]
  /** Orientation of the action panel */
  orientation?: Orientation
  /** If true, the panel will have no padding */
  isNoPadding?: boolean
  /** Gap between buttons */
  gap?: PossibleGapVariants
}
