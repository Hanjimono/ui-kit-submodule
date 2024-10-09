import { PillarProps } from "@/ui/Layout/Pillar/types"

/**
 * Field component wraps a form element. It's also can be used to display a label and error message.
 * It's accept the same props as Pillar component.
 */
export interface FormFieldProps extends PillarProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Form element label. Shown at the top of the form element */
  label?: string
  /** Errors message. Shown at the bottom of the form element */
  error?: string
  /** If passed there are will be a blank space at the top of the input the same size as the label */
  fakeLabel?: boolean
}
