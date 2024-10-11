import { PillarProps } from "@/ui/Layout/Pillar/types"
import { IconType } from "@/ui/Presentation/Icon/types"
import Form from "../Form"
import { FormElement } from "../types"

type InputAttribute = React.InputHTMLAttributes<HTMLInputElement>
type InputAttributeOverrided = Omit<InputAttribute, "onChange"> & {
  onChange?: (name: string, value: any) => void
}

/**
 * Basic input component, for changing and displaying text values
 */
export interface InputProps
  extends FormElement,
    InputAttributeOverrided,
    PillarProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** If passed it will be displayed on the top of the input */
  label?: string
  /** If passed there are will be a blank space at the top of the input the same size as the label */
  fakeLabel?: boolean
  /** Name of the input */
  name: string
  /** Current value of the input.
   *  You need to pass this if you control form fields via some parent component state or etc
   */
  value?: string | number
  /** Flag to add clear button to the input */
  clearable?: boolean
  /** Name of the icon on the input, that will be shown at the start of the input */
  icon?: string
  /** Name of the icon on the input, that will be shown at the end of the input */
  endIcon?: string
  /** Size of the icon on the input */
  iconSize?: number
  /** Height of the icon on the input. Used only for custom icons */
  iconHeight?: number
  /** Icon type of the icon on the input. Material icons by default */
  iconType?: IconType
  /** Flag to add loading spinner to the input */
  loading?: boolean
  /** Error message that will be shown under the input and input will be styled as an error */
  error?: string
  /** Flag to add filled style to the input */
  filled?: boolean
  /** Flag to place the label on the fixed position on top of the input */
  labelOnTop?: boolean
  /** Flag to disable animation of the label */
  noAnimation?: boolean
}