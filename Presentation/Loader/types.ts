/** Represents the different size types available for a loader */
export type SizeType = "xs" | "sm" | "md" | "lg" | "xl"

/** Represents the props expected by a loader container styled component */
export interface LoaderContainerStyledProps {
  /** The size of the loader container */
  size: string
}

/** Represents the props expected by a loader styled component */
export interface LoaderStyledProps {
  /** The size of the loader */
  size: string
  /** Whether the loader should have an alternative color */
  alternativeColor: boolean
}

/** Represents the props that can be passed to a loader component */
export interface LoaderProps {
  /** Optional size of the loader */
  size?: number | SizeType
  /** Optional size of the loader container */
  containerSize?: number
  /** Optional flag to specify alternative color for the loader */
  alternativeColor?: boolean
}
