/** Main interface for form element */
export interface FormElement {
  /** Function that will be called when element value changes. */
  onChange?: (name: string, value: any) => void
  /** Function that will be called when clear button is clicked */
  onClear?: (name: string) => void
}
