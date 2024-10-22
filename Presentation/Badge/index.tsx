// System
import { useEffect } from "react"
import clsx from "clsx"
import { AnimatePresence, motion, useAnimate } from "framer-motion"
// Ui
import Text from "@/ui/Presentation/Text"
// Styles and types
import { BadgeProps } from "./types"
import styles from "./styles.module.scss"

/**
 * Badge component that displays a number with animation effects.
 *
 * @param {number} number - The number to display inside the badge.
 * @param {number} [maxNumber=99] - The maximum number to display before showing "+" sign.
 * @param {boolean} showWithoutNumber - Flag to show the badge even if the number is not provided or zero.
 * @param {string} className - Additional class names to apply to the badge container.
 *
 * @returns {JSX.Element} The animated badge component.
 */
function Badge({
  number,
  maxNumber = 99,
  showWithoutNumber,
  className
}: BadgeProps) {
  const [scope, animate] = useAnimate()
  const calculatedClassNames = clsx(styles["badge-container"], className)

  /** Toggle animation on every number change */
  useEffect(() => {
    const animation = () => {
      if (scope && scope.current) {
        animate(
          scope.current,
          { scale: [1.1, 1], rotate: [0, 10, -10, 0] },
          { duration: 0.4 }
        )
      }
    }
    if (number && number > 0) {
      animation()
    }
  }, [number, scope, animate])

  return (
    <AnimatePresence>
      {(showWithoutNumber || (number && number > 0)) && (
        <motion.div
          ref={scope}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            scale: { type: "spring", duration: 0.4 }
          }}
          className={calculatedClassNames}
        >
          <Text type="fit-line" size="small" bold>
            {number ? (number > maxNumber ? maxNumber + "+" : number) : ""}
          </Text>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Badge
