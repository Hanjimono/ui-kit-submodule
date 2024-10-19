import { PillarProps } from "@/ui/Layout/Pillar/types"
import { FormElement } from "../types"
import { FieldValues } from "react-hook-form"

export interface SwitchProps<FormValues extends FieldValues>
  extends FormElement<FormValues>,
    PillarProps {
  /** Classes */
  className?: string
  /** The label for the switch */
  label?: string
  /** The label for the switch on the left side */
  leftLabel?: string
  /** Checked state of the switch */
  checked?: boolean
  /** Flag to disable the switch */
  disabled?: boolean
  /** Error message that will be shown under the switch */
  error?: string
  /** Text to show when the switch is on */
  switchOnText?: string
  /** Text to show when the switch is off */
  switchOffText?: string
  /** Remove on/off text */
  withoutText?: boolean
}
