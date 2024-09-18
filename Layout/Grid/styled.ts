/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled"
import { GridItemStyledProps, GridRowStyledProps } from "./types"
import { styleSettings, percentage } from "./settings"

export const StyledGridRow = styled("div")(
  ({ noSpacing, box }: GridRowStyledProps) => ({
    width: "100%",
    height: !!box ? "100%" : undefined,
    boxSizing: "border-box",
    display: "flex",
    flex: "0 1 auto",
    flexWrap: "wrap",
    marginRight: noSpacing ? 0 : "-" + styleSettings.basicSpacing,
    marginLeft: noSpacing ? 0 : "-" + styleSettings.basicSpacing
  })
)
export const StyledGridItem = styled("div")(
  ({
    xsSize,
    xsOffset,
    smSize,
    smOffset,
    mdSize,
    mdOffset,
    lgSize,
    lgOffset,
    noSpacing,
    container
  }: GridItemStyledProps) => ({
    boxSizing: "border-box",
    height: !!container ? "100%" : undefined,
    flex: "0 0 auto",
    paddingRight: noSpacing ? 0 : styleSettings.basicSpacing,
    paddingLeft: noSpacing ? 0 : styleSettings.basicSpacing,
    flexBasis: percentage[xsSize],
    maxWidth: percentage[xsSize],
    marginLeft: percentage[xsOffset],
    ["@media " + styleSettings.smViewport]: {
      flexBasis: percentage[smSize],
      maxWidth: percentage[smSize],
      marginLeft: percentage[smOffset]
    },
    ["@media " + styleSettings.mdViewport]: {
      flexBasis: percentage[mdSize],
      maxWidth: percentage[mdSize],
      marginLeft: percentage[mdOffset]
    },
    ["@media " + styleSettings.lgViewport]: {
      flexBasis: percentage[lgSize],
      maxWidth: percentage[lgSize],
      marginLeft: percentage[lgOffset]
    }
  })
)
