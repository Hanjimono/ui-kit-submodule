import {
  FieldValues,
  UseFormSetValue,
  UseFormResetField,
  UseFormHandleSubmit,
  Path,
  FieldErrors,
  Control
} from "react-hook-form"

export interface FormElementWrapperBaseProps<FormValues extends FieldValues> {
  /** React children */
  children?: React.ReactNode
  /** Function called when form element changes */
  onChange?: (name: Path<FormValues>, value: any) => void
  /** Function called when form is submitted */
  onSubmit?: (data: FormValues) => void
  /** Function called when form is submitted with errors */
  onInvalidSubmit?: (errors: FieldErrors<FormValues>) => void
}

export interface FormElementWrapperProps<FormValues extends FieldValues>
  extends FormElementWrapperBaseProps<FormValues> {
  /** The function from react-hook-form to reset a specific field. */
  resetField?: UseFormResetField<FormValues>
  /** The function from react-hook-form to set the value of a specific field. */
  setValue?: UseFormSetValue<FormValues>
  /** The function from react-hook-form to handle form submission. */
  handleSubmit?: UseFormHandleSubmit<FormValues>
  /** React hook control object */
  control?: Control<FormValues>
}
