// System
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormStateReturn
} from "react-hook-form"

/** Main interface for form element */
export interface FormElement<FormValues extends FieldValues> {
  /** Name of the form element. */
  name: Path<FormValues>
  /** Function that will be called when element value changes. */
  onChange?: (name: Path<FormValues>, value?: any) => void
  /** Function that will be called when clear button is clicked */
  onClear?: (name: Path<FormValues>) => void
  /** RHC form field info */
  field?: ControllerRenderProps<FormValues>
  /** RHC form state info */
  formState?: UseFormStateReturn<FormValues>
}
