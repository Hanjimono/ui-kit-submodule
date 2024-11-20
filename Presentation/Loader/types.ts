/** Represents the different size types available for a loader */
export type SizeType = "xs" | "sm" | "md" | "lg" | "xl" | "full"

/** Represents the props that can be passed to a loader component */
export interface LoaderProps {
  /** Optional size of the loader */
  size?: number | SizeType
}
