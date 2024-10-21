import { FieldValues, Path } from "react-hook-form"
import { PillarProps } from "@/ui/Layout/Pillar/types"
import { IconType } from "@/ui/Presentation/Icon/types"
import { FormElement } from "../types"
import { HTMLInputTypeAttribute } from "react"
import { Formatter } from "./formatters"

/**
 * Basic input component, for changing and displaying text values
 */
export interface InputProps<FormValues extends FieldValues>
  extends FormElement<FormValues>,
    PillarProps {
  /** Classes */
  className?: string
  /** If passed it will be displayed on the top of the input */
  label?: string
  /** If passed there are will be a blank space at the top of the input the same size as the label */
  fakeLabel?: boolean
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
  /** Type of the input. Text by default */
  type?: HTMLInputTypeAttribute
  /** Placeholder of the input. If animation enabled it will be shown only when input is focused */
  placeholder?: string
  /**
   * Formats the input value based on the specified formatter name. Can be one value, or array of values.
   * !important. Formatters will be applied on every input change. The main purpose of this prop is to limit the input.
   * Supported formatters are:
   *   - "maxLength:<length>": Limits the input to a maximum length specified by `<length>`.
   *   - "numbers": Allows only numeric characters.
   *   - "numbersAndCommaAndDot": Allows numeric characters, commas, and dots.
   *   - "twoDecimals": Formats the input to two decimal places.
   *   - "threeDecimals": Formats the input to three decimal places.
   */
  formatter?: Formatter | Formatter[]
  /** Flag to disable the input without disabling styles */
  noMouseEvent?: boolean
  /** Flag to make the input focused */
  focused?: boolean
  /** Flag to disable the input */
  disabled?: boolean
  /** Remove form field wrapper from the Input */
  withoutFormField?: boolean
}
