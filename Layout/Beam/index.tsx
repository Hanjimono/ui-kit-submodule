// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
// Types and styles
import { BeamProps } from "./types"

/**
 * Beam component is a flexible layout container. Main function is to be a row in a grid system and set
 * up grid properties for its children Pillar components.
 * You should set number of columns for the grid layout using `cols` prop and set-up a gap using gap-{size} class.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the Beam component.
 * @param {string} [className] - Additional class names to apply to the Beam component.
 * @param {boolean} [withoutWrap] - If true, disables wrapping of the content.
 * @param {boolean} [whole] - If true, applies a style that makes the Beam component take the whole width.
 * @param {string} [contentJustify] - Applies a justification style to the content within the Beam component.
 * @param {string} [contentAlign] - Applies an alignment style to the content within the Beam component.
 *
 * @returns {JSX.Element} The rendered Beam component.
 */
function Beam({ children, className, isWithoutWrap, cols = 12 }: BeamProps) {
  const calculatedClassNames = formatClassnames(
    "beam",
    "flex w-full min-w-0 box-border grow-0 shrink flex-basis-auto",
    !!isWithoutWrap ? "flex-nowrap" : "flex-wrap",
    className
  )
  const gapParamInClass = className?.match(/gap-([a-zA-Z0-9]+)/)
  const gapValue = (gapParamInClass && gapParamInClass[1]) || 0
  const isGapVariable = gapValue ? /^[a-zA-Z]+$/.test(gapValue) : false
  return (
    <div
      style={
        {
          "--grid-gap": !isGapVariable
            ? `calc(var(--spacing) * ${gapValue})`
            : `var(--${gapValue})`,
          "--grid-cols": cols
        } as React.CSSProperties & Record<string, string | number>
      }
      className={calculatedClassNames}
    >
      {children}
    </div>
  )
}
export default Beam
