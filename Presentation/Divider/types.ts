import { Gap } from "@/ui/Layout/Gaper/types"

type DividerOrientation = "horizontal" | "vertical"

export interface DividerProps {
  /** Classes */
  className?: string
  /** Divider orientation */
  orientation?: DividerOrientation
}
