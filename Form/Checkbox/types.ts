import { FieldValues } from "react-hook-form"
import { FormElement } from "../types"
import { PillarProps } from "@/ui/Layout/Pillar/types"

type CheckboxChecked = boolean | "partial"

/** Checkbox component for forms */
export interface CheckboxProps<FormValues extends FieldValues>
  extends FormElement<FormValues>,
    PillarProps {
  /** Classes */
  className?: string
  /** The label for the checkbox */
  label?: string
  /** Checked state of the checkbox */
  checked?: CheckboxChecked
  /** Flag to disable the checkbox */
  disabled?: boolean
  /** Error message that will be shown under the checkbox and checkbox will be styled as an error */
  error?: string
}
