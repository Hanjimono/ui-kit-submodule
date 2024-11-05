import { IconType } from "@/ui/Presentation/Icon/types"

type Orientation = "horizontal" | "vertical"

interface Action {
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
  items: Action[]
  endItems?: Action[]
  orientation?: Orientation
}
