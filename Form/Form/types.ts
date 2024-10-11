import { BeamProps } from "@/ui/Layout/Beam/types"

/**
 * Basic form component. Render a form element with children inside Beam(row) component.
 * onChange function will be passed to all children components.
 */
export interface FormProps extends BeamProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Function called when form element changes */
  onChange: (name: string, value: any) => void
}