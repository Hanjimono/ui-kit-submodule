import { FieldValues } from "react-hook-form"
import { FormElement } from "../types"
import { IconType } from "@/ui/Presentation/Icon/types"
import { PillarProps } from "@/ui/Layout/Pillar/types"

export interface DefaultSelectOption {
  title: string
  value: string | number
}

/** A custom select component that integrates with form handling libraries. */
export interface SelectProps<
  SelectOptionType extends DefaultSelectOption,
  FormValues extends FieldValues
> extends FormElement<FormValues>,
    PillarProps {
  /** Classes */
  className?: string
  /** If passed it will be displayed on the top of the select */
  label?: string
  /** If passed there are will be a blank space at the top of the select the same size as the label */
  fakeLabel?: boolean
  /**
   * Current value of the select.
   * You need to pass this if you control form fields via some parent component state or etc.
   */
  value?: string | number | string[] | number[]
  /** Flag to add clear button to the select */
  clearable?: boolean
  /** Name of the icon on the select, that will be shown at the start of the select */
  icon?: string
  /** Size of the icon on the select */
  iconSize?: number
  /** Height of the icon on the select. Used only for custom icons */
  iconHeight?: number
  /** Icon type of the icon on the select. Material icons by default */
  iconType?: IconType
  /** Flag to add loading spinner to the select */
  loading?: boolean
  /** Error message that will be shown under the select and select will be styled as an error */
  error?: string
  /** Flag to add filled style to the select */
  filled?: boolean
  /** Flag to place the label on the fixed position on top of the select */
  labelOnTop?: boolean
  /** Flag to disable animation of the label */
  noAnimation?: boolean
  /** Placeholder of the select. If animation enabled it will be shown only when select is focused */
  placeholder?: string
  /** Options for the select */
  options: SelectOptionType[]
  /** Select menu will be opened on top of the select */
  openOnTop?: boolean
  /** Flag to disable the select */
  disabled?: boolean
  /** Flag to enable multiselect */
  multiselect?: boolean
}
