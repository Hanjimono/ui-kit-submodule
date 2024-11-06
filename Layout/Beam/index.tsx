// System
import clsx from "clsx"
// Ui
import { addGap } from "../Gaper"
// Types and styles
import { BeamProps } from "./types"
import styles from "./styles.module.scss"

/** Basic row component in layout */
/**
 * Beam component is a flexible layout container that applies various styles based on the provided props.
 * Basically, it's a row component that can be used to wrap content and apply styles to it.
 * Very similar to the Bootstrap row component.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the Beam component.
 * @param {string} [className] - Additional class names to apply to the Beam component.
 * @param {boolean} [withoutWrap] - If true, disables wrapping of the content.
 * @param {boolean} [whole] - If true, applies a style that makes the Beam component take the whole width.
 * @param {Gap|true} [bottomGap] - If true, adds a bottom gap to the Beam component.
 * @param {boolean} [withoutGap] - If true, removes any gaps from the Beam component.
 * @param {string} [contentJustify] - Applies a justification style to the content within the Beam component.
 * @param {string} [contentAlign] - Applies an alignment style to the content within the Beam component.
 *
 * @returns {JSX.Element} The rendered Beam component.
 */
function Beam({
  children,
  className,
  withoutWrap,
  whole,
  bottomGap,
  withoutGap,
  contentJustify,
  contentAlign
}: BeamProps) {
  const calculatedClassNames = clsx(
    styles["beam"],
    className,
    !!withoutWrap && styles["no-wrap"],
    !!whole && styles["whole"],
    !!contentJustify && styles[contentJustify],
    !!contentAlign && styles["align-" + contentAlign],
    addGap(
      !!withoutGap ? "same" : "same-level",
      bottomGap === true ? "other-level" : bottomGap
    )
  )
  return <div className={calculatedClassNames}>{children}</div>
}
export default Beam
