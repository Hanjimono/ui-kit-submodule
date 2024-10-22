/** Badge component that displays a number with animation effects. */
export interface BadgeProps {
  /** Additional CSS classes to apply to the badge */
  className?: string
  /** The number to display inside the badge */
  number?: number
  /** The maximum number to display before showing a "+" */
  maxNumber?: number
  /** Whether to show the badge even if no number is provided */
  showWithoutNumber?: boolean
}
