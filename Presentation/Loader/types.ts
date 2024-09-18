// Represents the different size types available for a loader
export type SizeType = "xs" | "sm" | "md" | "lg" | "xl"

// Represents the props expected by a loader container styled component
export interface LoaderContainerStyledProps {
  size: string // The size of the loader container
}

// Represents the props expected by a loader styled component
export interface LoaderStyledProps {
  size: string // The size of the loader
  alternativeColor: boolean // Whether the loader should have an alternative color
}

// Represents the props that can be passed to a loader component
export interface LoaderProps {
  size?: number | SizeType // Optional size of the loader
  containerSize?: number // Optional size of the loader container
  alternativeColor?: boolean // Optional flag to specify alternative color for the loader
}
