import { WallProps } from "@/ui/Layout/Wall/types"
import { AppearAnimationVariants } from "@/ui/Skeleton/Transition/ContentAppearTransition/types"

/** A component that wraps the `Wall` component with optional animation and additional styling. */
export interface DecoratedWallProps extends WallProps {
  /**
   * The mode of animation to apply. Be cautious, that only simple animation mode certainly works on
   * components without overflow: auto. Be careful with other modes.
   */
  animationMode?: AppearAnimationVariants | "none"
}
