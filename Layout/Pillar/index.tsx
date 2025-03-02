// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
// Types and styles
import { AvailableOffsetSizes, AvailableSizes, PillarProps } from "./types"

const PILLAR_SIZES: Record<AvailableSizes, string> = {
  1: "w-gap-1/12",
  2: "w-gap-2/12",
  3: "w-gap-3/12",
  4: "w-gap-4/12",
  5: "w-gap-5/12",
  6: "w-gap-6/12",
  7: "w-gap-7/12",
  8: "w-gap-8/12",
  9: "w-gap-9/12",
  10: "w-gap-10/12",
  11: "w-gap-11/12",
  12: "w-full"
}

const PILLAR_SIZE_SM: Record<AvailableSizes, string> = {
  1: "sm:w-gap-1/12",
  2: "sm:w-gap-2/12",
  3: "sm:w-gap-3/12",
  4: "sm:w-gap-4/12",
  5: "sm:w-gap-5/12",
  6: "sm:w-gap-6/12",
  7: "sm:w-gap-7/12",
  8: "sm:w-gap-8/12",
  9: "sm:w-gap-9/12",
  10: "sm:w-gap-10/12",
  11: "sm:w-gap-11/12",
  12: "sm:w-full"
}

const PILLAR_SIZE_MD: Record<AvailableSizes, string> = {
  1: "md:w-gap-1/12",
  2: "md:w-gap-2/12",
  3: "md:w-gap-3/12",
  4: "md:w-gap-4/12",
  5: "md:w-gap-5/12",
  6: "md:w-gap-6/12",
  7: "md:w-gap-7/12",
  8: "md:w-gap-8/12",
  9: "md:w-gap-9/12",
  10: "md:w-gap-10/12",
  11: "md:w-gap-11/12",
  12: "md:w-full"
}

const PILLAR_SIZE_LG: Record<AvailableSizes, string> = {
  1: "lg:w-gap-1/12",
  2: "lg:w-gap-2/12",
  3: "lg:w-gap-3/12",
  4: "lg:w-gap-4/12",
  5: "lg:w-gap-5/12",
  6: "lg:w-gap-6/12",
  7: "lg:w-gap-7/12",
  8: "lg:w-gap-8/12",
  9: "lg:w-gap-9/12",
  10: "lg:w-gap-10/12",
  11: "lg:w-gap-11/12",
  12: "lg:w-full"
}

const PILLAR_OFFSETS: Record<AvailableOffsetSizes, string> = {
  0: "",
  1: "ml-gap-1/12",
  2: "ml-gap-2/12",
  3: "ml-gap-3/12",
  4: "ml-gap-4/12",
  5: "ml-gap-5/12",
  6: "ml-gap-6/12",
  7: "ml-gap-7/12",
  8: "ml-gap-8/12",
  9: "ml-gap-9/12",
  10: "ml-gap-10/12",
  11: "ml-gap-11/12"
}

const PILLAR_OFFSET_SM: Record<AvailableOffsetSizes, string> = {
  0: "",
  1: "sm:ml-gap-1/12",
  2: "sm:ml-gap-2/12",
  3: "sm:ml-gap-3/12",
  4: "sm:ml-gap-4/12",
  5: "sm:ml-gap-5/12",
  6: "sm:ml-gap-6/12",
  7: "sm:ml-gap-7/12",
  8: "sm:ml-gap-8/12",
  9: "sm:ml-gap-9/12",
  10: "sm:ml-gap-10/12",
  11: "sm:ml-gap-11/12"
}

const PILLAR_OFFSET_MD: Record<AvailableOffsetSizes, string> = {
  0: "",
  1: "md:ml-gap-1/12",
  2: "md:ml-gap-2/12",
  3: "md:ml-gap-3/12",
  4: "md:ml-gap-4/12",
  5: "md:ml-gap-5/12",
  6: "md:ml-gap-6/12",
  7: "md:ml-gap-7/12",
  8: "md:ml-gap-8/12",
  9: "md:ml-gap-9/12",
  10: "md:ml-gap-10/12",
  11: "md:ml-gap-11/12"
}

const PILLAR_OFFSET_LG: Record<AvailableOffsetSizes, string> = {
  0: "",
  1: "lg:ml-gap-1/12",
  2: "lg:ml-gap-2/12",
  3: "lg:ml-gap-3/12",
  4: "lg:ml-gap-4/12",
  5: "lg:ml-gap-5/12",
  6: "lg:ml-gap-6/12",
  7: "lg:ml-gap-7/12",
  8: "lg:ml-gap-8/12",
  9: "lg:ml-gap-9/12",
  10: "lg:ml-gap-10/12",
  11: "lg:ml-gap-11/12"
}

/**
 * Pillar component is a flexible layout component that allows for responsive
 * column sizing and offsetting. It accepts various props to control the size
 * and offset of the column at different breakpoints.
 * Basically, it is a column in a grid system, very similar to the Bootstrap col component.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the Pillar.
 * @param {string} [className] - Additional class names to apply to the Pillar.
 * @param {number} [xs] - Column size for extra small screens.
 * @param {number} [sm] - Column size for small screens.
 * @param {number} [md] - Column size for medium screens.
 * @param {number} [lg] - Column size for large screens.
 * @param {number} [xsOffset] - Column offset for extra small screens.
 * @param {number} [smOffset] - Column offset for small screens.
 * @param {number} [mdOffset] - Column offset for medium screens.
 * @param {number} [lgOffset] - Column offset for large screens.
 * @param {boolean} [grow] - If true, the Pillar will grow to fill available space.
 *
 * @returns {JSX.Element} The rendered Pillar component.
 */
function Pillar({
  children,
  className,
  xs,
  md,
  sm,
  lg,
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  grow
}: PillarProps) {
  xs = xs || sm || md || lg || 12
  sm = sm || md || lg || 12
  const calculatedClassNames = twMerge(
    cx(
      "pillar grow-0 flex-shrink-1 flex-basis-auto",
      className,
      PILLAR_SIZES[xs],
      !!sm && PILLAR_SIZE_SM[sm],
      !!md && PILLAR_SIZE_MD[md],
      !!lg && PILLAR_SIZE_LG[lg],
      !!xsOffset && PILLAR_OFFSETS[xsOffset],
      !!smOffset && PILLAR_OFFSET_SM[smOffset],
      !!mdOffset && PILLAR_OFFSET_MD[mdOffset],
      !!lgOffset && PILLAR_OFFSET_LG[lgOffset],
      !!grow && "flex-grow-1 max-w-full"
    )
  )
  return <div className={calculatedClassNames}>{children}</div>
}
export default Pillar
