// System
import {
  DefaultValues,
  FieldErrors,
  FieldValues,
  Path,
  UseFormReturn
} from "react-hook-form"
// Types
import { BeamProps } from "@/ui/Layout/Beam/types"
import { ObjectSchema } from "yup"

/**
 * Basic form component. Render a form element with children inside Beam(row) component.
 * Form controls are managed by react-hook-form and will be passed to children form element.
 */
export interface FormProps<FormValues extends FieldValues> extends BeamProps {
  /** Default values for the form */
  defaultValues?: DefaultValues<FormValues>
  /** React hook form methods. If you want a direct control of the form and define useForm hook by yourself */
  methods?: UseFormReturn<FormValues, any, undefined>
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Function called when form element changes */
  onChange?: (name: Path<FormValues>, value: any) => void
  /** Function called when form is submitted */
  onSubmit?: (data: FormValues) => void
  /** Function called when form is submitted with errors */
  onInvalidSubmit?: (errors: FieldErrors<FormValues>) => void
  /** Add FormProvider to the form for using it with context in deeply nested components */
  useContext?: boolean
  /** Validation schema for the form generated with yup */
  validationSchema?: ObjectSchema<FormValues>
}
