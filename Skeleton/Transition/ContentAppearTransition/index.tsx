"use client"
// System
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
// Styles and types
import { ContentAppearTransitionProps } from "./types"
import { AnimationVariants } from "./variants"

/**
 * ContentAppearTransition component provides a smooth transition effect for its children
 * when component is mounted. It uses Framer Motion for animations.
 * It doesn't have it's own style. So you should use your wrapper component to style it
 * or define your own styles.
 *
 * @component
 * @param {ContentAppearTransitionProps} props - The properties for the ContentAppearTransition component.
 * @param {React.ReactNode} props.children - The content to be wrapped by the transition effect.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @param {boolean} [props.simple] - Indicates if the transition should use only opacity.
 * @param {string} [props.animationVariant] - The animation variant to use for the transition.
 * @param {object} [props.customAnimationVariants] - Custom animation variants to override default ones.
 *
 */
function ContentAppearTransition({
  children,
  className,
  animationVariant = "simple",
  customAnimationVariants
}: ContentAppearTransitionProps) {
  const pathName = usePathname()
  return (
    <motion.div
      key={pathName}
      className={className}
      initial="initialState"
      animate="animateState"
      exit="exitState"
      transition={{ duration: 0.75 }}
      variants={AnimationVariants[animationVariant]}
    >
      {children}
    </motion.div>
  )
}
export default ContentAppearTransition
