import { StyleSettingsInterface } from "./types"

export const percentage: { [key: number]: string } = {
  0: "0%",
  1: "8.33333333%",
  2: "16.66666667%",
  3: "25%",
  4: "33.33333333%",
  5: "41.66666667%",
  6: "50%",
  7: "58.33333333%",
  8: "66.66666667%",
  9: "75%",
  10: "83.33333333%",
  11: "91.66666667%",
  12: "100%"
}

export const styleSettings: StyleSettingsInterface = {
  basicSpacing: "0.5rem",
  smViewport: "only screen and (min-width: 48em)",
  mdViewport: "only screen and (min-width: 64em)",
  lgViewport: "only screen and (min-width: 75em)"
}
