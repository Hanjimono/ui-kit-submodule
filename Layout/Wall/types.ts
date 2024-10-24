/** Basic page component, that will take all available space. Uses flex-box */
export interface WallProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
}

/** A component that wraps the `Wall` component with optional animation and additional styling. */
export interface DecoratedWallProps extends WallProps {
  transitionClassName?: string
  animationMode?: "default" | "simple" | "none"
}
