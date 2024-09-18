import React from "react"
import { GridProps } from "./types"
import { StyledGridRow, StyledGridItem } from "./styled"

function Grid({
  row,
  item,
  xs,
  sm,
  md,
  lg,
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  children,
  ...rest
}: GridProps) {
  if (!!item) {
    if (xs === true) {
      xs = 12
    }
    if (sm === true) {
      sm = 12
    }
    if (md === true) {
      md = 12
    }
    if (lg === true) {
      lg = 12
    }
    if (xsOffset === true) {
      xsOffset = 11
    }
    if (smOffset === true) {
      smOffset = 11
    }
    if (mdOffset === true) {
      mdOffset = 11
    }
    if (lgOffset === true) {
      lgOffset = 11
    }
    return (
      <StyledGridItem
        xsSize={xs || 12}
        smSize={sm || xs || 12}
        mdSize={md || sm || xs || 12}
        lgSize={lg || md || sm || xs || 12}
        xsOffset={xsOffset || 0}
        smOffset={smOffset || xsOffset || 0}
        mdOffset={mdOffset || smOffset || xsOffset || 0}
        lgOffset={lgOffset || mdOffset || smOffset || xsOffset || 0}
        {...rest}
      >
        {children}
      </StyledGridItem>
    )
  }
  return <StyledGridRow {...rest}>{children}</StyledGridRow>
}
export default Grid
