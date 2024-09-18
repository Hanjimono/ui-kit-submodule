/** A block for code presentation with copy button */
export interface CodeProps {
  /** Code to display. Do not forget using ` instead of " to correctly parse newlines */
  code: string
  /** Classes */
  className?: string
  /**
   * If true, the copy button will not be rendered
   */
  withoutCopy?: boolean
  /**
   * If true, line numbers will not be rendered
   */
  hideLineNumbers?: boolean
}
