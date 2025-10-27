import { Variants } from "framer-motion"

export type AppearAnimationVariants = "slide-both-sides" | "simple"

/** ContentAppearTransition component provides a smooth transition effect for its children */
export interface ContentAppearTransitionProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Define the animation variant to use */
  animationVariant?: AppearAnimationVariants
  /** Custom animation variants to override default ones */
  customAnimationVariants?: Variants
}
