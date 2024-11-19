import clsx from "clsx"
import { Gap } from "./types"

const GAPER_GAP: Record<Gap, string | undefined> = {
  "almost-same": "gap-almost-same",
  close: "gap-close",
  "same-level": "gap-same-level",
  "other-level": "gap-other-level",
  "other-level-large": "gap-other-level-large",
  same: undefined
}

const GAPER_BOTTOM_GAP: Record<Gap, string | undefined> = {
  "almost-same": "mb-almost-same",
  close: "mb-close",
  "same-level": "mb-same-level",
  "other-level": "mb-other-level",
  "other-level-large": "mb-other-level-large",
  same: undefined
}

const GAPER_TOP_GAP: Record<Gap, string | undefined> = {
  "almost-same": "mt-almost-same",
  close: "mt-close",
  "same-level": "mt-same-level",
  "other-level": "mt-other-level",
  "other-level-large": "mt-other-level-large",
  same: undefined
}

const GAPER_LEFT_GAP: Record<Gap, string | undefined> = {
  "almost-same": "ml-almost-same",
  close: "ml-close",
  "same-level": "ml-same-level",
  "other-level": "ml-other-level",
  "other-level-large": "ml-other-level-large",
  same: undefined
}

const GAPER_RIGHT_GAP: Record<Gap, string | undefined> = {
  "almost-same": "mr-almost-same",
  close: "mr-close",
  "same-level": "mr-same-level",
  "other-level": "mr-other-level",
  "other-level-large": "mr-other-level-large",
  same: undefined
}

export function addGap(
  gap?: Gap,
  bottomGap?: Gap,
  topGap?: Gap,
  leftGap?: Gap,
  rightGap?: Gap
): string {
  return clsx(
    gap && GAPER_GAP[gap],
    bottomGap && GAPER_BOTTOM_GAP[bottomGap],
    topGap && GAPER_TOP_GAP[topGap],
    leftGap && GAPER_LEFT_GAP[leftGap],
    rightGap && GAPER_RIGHT_GAP[rightGap]
  )
}
