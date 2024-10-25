// System
import clsx from "clsx"
import { useRef } from "react"
import { motion } from "framer-motion"
// Ui
import { useOuterClick } from "@/ui/Skeleton/Hooks"
// Styles and types
import { ModalSkeletonProps } from "./types"
import styles from "./styles.module.scss"

/**
 * ModalSkeleton component is a modal wrapper. It allows open modal with animation and optional mask.
 * It supports closing the modal when clicking outside of it, unless specified otherwise.
 *
 * @param {React.ReactNode} children - The actual modal component.
 * @param {string} className - Additional class names to apply to the modal-wrapper.
 * @param {boolean} withoutMask - Whether to display a mask behind the modal.
 * @param {() => void} onClose - Callback function to be called when the modal is requested to be closed.
 * @param {boolean} isNotClosable - If true, the modal cannot be closed by clicking outside of it.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
function ModalSkeleton({
  children,
  className,
  withoutMask,
  onClose,
  isNotClosable
}: ModalSkeletonProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const calculatedClassNames = clsx(styles["modal-skeleton"], className)
  useOuterClick(onClose, modalRef, !isNotClosable)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles["modal-wrapper"]}
    >
      <motion.div
        className={calculatedClassNames}
        ref={modalRef}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        {children}
      </motion.div>
      {!withoutMask && <div className={styles["modal-mask"]} />}
    </motion.div>
  )
}
export default ModalSkeleton
