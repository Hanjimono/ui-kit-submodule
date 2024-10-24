"use client"
// System
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { motion } from "framer-motion"
// Styles and types
import { ContentAppearTransitionProps } from "./types"
import styles from "./styles.module.scss"

/**
 * ContentAppearTransition component provides a smooth transition effect for its children
 * when component is mounted. It uses Framer Motion for animations.
 * You should use it as parent for the page content you want to animate.
 *
 * @component
 * @param {ContentAppearTransitionProps} props - The properties for the ContentAppearTransition component.
 * @param {React.ReactNode} props.children - The content to be wrapped by the transition effect.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @param {boolean} [props.simple] - Indicates if the transition should use only opacity.
 *
 */
function ContentAppearTransition({
  children,
  className,
  simple
}: ContentAppearTransitionProps) {
  const pathName = usePathname()
  const calculatedClassNames = clsx(styles["content-transition"], className)
  return (
    <motion.div
      key={pathName}
      className={calculatedClassNames}
      initial="initialState"
      animate="animateState"
      exit="exitState"
      transition={{ duration: 0.75 }}
      variants={{
        initialState: {
          opacity: 0,
          clipPath: !simple
            ? "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)"
            : undefined
        },
        animateState: {
          opacity: 1,
          clipPath: !simple
            ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
            : undefined
        }
      }}
    >
      {children}
    </motion.div>
  )
}
export default ContentAppearTransition
