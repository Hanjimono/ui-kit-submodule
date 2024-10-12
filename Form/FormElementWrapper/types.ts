import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormResetField,
  UseFormHandleSubmit,
  Path,
  FieldErrors
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
  register?: UseFormRegister<FormValues>
  resetField?: UseFormResetField<FormValues>
  setValue?: UseFormSetValue<FormValues>
  handleSubmit?: UseFormHandleSubmit<FormValues>
}
