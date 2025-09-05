import { AvailableSizes } from "../Pillar/types"

/** Basic row component in layout */
export interface BeamProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Content do not wrap */
  isWithoutWrap?: boolean
  /** Number of columns for grid layout */
  cols?: AvailableSizes
}
