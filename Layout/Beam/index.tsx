// System
import { twMerge } from "tailwind-merge"
import { cx } from "class-variance-authority"
// Types and styles
import { BeamProps } from "./types"

const CONTENT_JUSTIFY: Record<string, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around"
}

const CONTENT_ALIGN: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end"
}

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
  contentJustify,
  contentAlign
}: BeamProps) {
  const calculatedClassNames = twMerge(
    cx(
      "beam",
      "flex w-full min-w-0 box-border grow-0 shrink flex-basis-auto",
      !!withoutWrap ? "flex-nowrap" : "flex-wrap",
      !!whole && "h-full",
      !!contentJustify && CONTENT_JUSTIFY[contentJustify],
      !!contentAlign && CONTENT_ALIGN[contentAlign],
      className
    )
  )
  return <div className={calculatedClassNames}>{children}</div>
}
export default Beam
