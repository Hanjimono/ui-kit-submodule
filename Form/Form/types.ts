// System
import { FieldErrors, FieldValues, Path } from "react-hook-form"
// Types
import { BeamProps } from "@/ui/Layout/Beam/types"

/**
 * Basic form component. Render a form element with children inside Beam(row) component.
 * onChange function will be passed to all children components.
 */
export interface FormProps<FormValues extends FieldValues> extends BeamProps {
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
}
