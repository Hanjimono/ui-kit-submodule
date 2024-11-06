import clsx from "clsx"
import { Gap } from "./types"

export function addGap(
  gap?: Gap,
  bottomGap?: Gap,
  topGap?: Gap,
  leftGap?: Gap,
  rightGap?: Gap
): string {
  return clsx(
    gap && "gap-" + gap,
    bottomGap && "bottom-gap-" + bottomGap,
    topGap && "top-gap-" + topGap,
    leftGap && "left-gap-" + leftGap,
    rightGap && "right-gap-" + rightGap
  )
}
