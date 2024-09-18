type BrickDurability = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface BrickProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  flex?: boolean
  durability?: BrickDurability
  square?: boolean
  shadowless?: boolean
  withMargin?: boolean
}
