import { FieldValues } from "react-hook-form"
import { FormElement } from "../types"
import { PillarProps } from "@/ui/Layout/Pillar/types"

type RadioType = "rows" | "columns"

export interface DefaultRadioOption {
  title: string
  value: any
}

/**
 * A functional component that renders a group of radio buttons within a form field.
 */
export interface RadioProps<
  RadioOptionType extends DefaultRadioOption,
  FormValues extends FieldValues
> extends FormElement<FormValues>,
    PillarProps {
  /** Classes */
  className?: string
  /** Error message that will be shown under the select and select will be styled as an error */
  error?: string
  /** Options for the Radio */
  options: RadioOptionType[]
  /** Flag to disable the select */
  disabled?: boolean
  /**
   * Current value of the radio.
   * You need to pass this if you control form fields via some parent component state or etc.
   */
  value?: string | number
  /** Type of placement of the radio items. Available values: "rows" | "columns" */
  type?: RadioType
}

/**
 * A functional component that renders a radio item within a form.
 */
export interface RadioItemProps<
  RadioOptionType extends DefaultRadioOption,
  FormValues extends FieldValues
> extends Omit<RadioProps<RadioOptionType, FormValues>, "options" | "type"> {
  /** Current radio option */
  item: RadioOptionType
}
