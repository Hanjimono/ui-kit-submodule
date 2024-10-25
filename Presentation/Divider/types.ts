type DividerOrientation = "horizontal" | "vertical"

type DividerGapSize = "no" | "default" | "small"

export interface DividerProps {
  /** Classes */
  className?: string
  /** Divider orientation */
  orientation?: DividerOrientation
  /** Gap size */
  gap?: DividerGapSize | boolean
}
