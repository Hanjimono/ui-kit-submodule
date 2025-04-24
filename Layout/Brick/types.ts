import { Gap } from "../Gaper/types"

export type BrickDurability = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

/** Basic block component. Renders a styled `div` element with various optional properties. */
export interface BrickProps extends React.HTMLProps<HTMLDivElement> {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** If true, applies flexbox styling to the `div`. */
  flex?: boolean
  /** A number representing the durability level, which affects the applied styles. Higher numbers is more light. */
  durability?: BrickDurability
  /** If true, it removes the border radius from the `div`. */
  square?: boolean
  /** If true, applies a bottom margin to the `div`. */
  bottomGap?: Gap | true
  /** If true, applies a whole width styling to the `div`. */
  whole?: boolean
  /** If true, removes padding from the `div`. */
  noPadding?: boolean
}
