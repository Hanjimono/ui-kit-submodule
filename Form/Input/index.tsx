"use client"
// System
import { Fragment, useCallback, useMemo } from "react"
import { twMerge } from "tailwind-merge"
import { cx } from "class-variance-authority"
import { FieldValues } from "react-hook-form"
// Ui
import FormField from "../Field"
import Button from "@/ui/Actions/Button"
import Icon from "@/ui/Presentation/Icon"
import Loader from "@/ui/Presentation/Loader"
import Text from "@/ui/Presentation/Text"
// Logic
import { inputFormat } from "./formatters"
import { useFormattedError, useFormattedValue } from "@/ui/Form/Hooks"
// Styles and types
import { InputProps } from "./types"

/**
 * A versatile Input component for forms, supporting various features such as icons, error handling, and formatting.
 * Can be used with react-hook-form or standalone.
 *
 * @template FormValues - The type of the form values.
 * @param {InputProps<FormValues>} props - The properties for the Input component.
 * @param {string} [props.className] - Additional class names for styling.
 * @param {string} [props.label] - The label for the input field.
 * @param {string} props.name - The name of the input field.
 * @param {string} [props.value] - The value of the input field. Not required when using react-hook-form.
 * @param {(name: string, value: string | undefined) => void} [props.onChange] - The function to call when the input value changes.
 * @param {boolean} [props.clearable] - Whether the input field is clearable.
 * @param {(name: string) => void} [props.onClear] - The function to call when the clear button is clicked.
 * @param {string} [props.icon] - The icon to display at the start of the input field.
 * @param {string} [props.endIcon] - The icon to display at the end of the input field.
 * @param {number} [props.iconSize=24] - The size of the icon.
 * @param {number} [props.iconHeight=24] - The height of the icon.
 * @param {string} [props.iconType="md"] - The type of the icon.
 * @param {boolean} [props.loading] - Whether the input field is in a loading state.
 * @param {string | boolean} [props.error] - The error message or state for the input field.
 * @param {boolean} [props.filled] - Whether the input field is filled.
 * @param {boolean} [props.labelOnTop] - Whether the label should be displayed on top of the input field.
 * @param {string | string[]} [props.formatter] - The formatter(s) to apply to the input value.
 * @param {FieldValues} [props.field] - The field object from react-hook-form.
 * @param {FormState<FieldValues>} [props.formState] - The form state object from react-hook-form.
 * @param {boolean} [props.noMouseEvent] - Whether to disable mouse events without applying disabled styles.
 * @param {boolean} [props.focused] - Whether the input field is focused.
 * @param {boolean} [props.disabled] - Whether the input field is disabled.
 * @param {object} [props.rest] - Additional properties to pass to the input field (Pillar).
 * @param {boolean} [props.withoutFormField] - Whether to render the input without a form field wrapper.
 * @param {Function} [props.onFocus] - The function to call when the input field is focused.
 * @param {Function} [props.onBlur] - The function to call when the input field is blurred.
 * @returns {JSX.Element} The rendered Input component.
 */
function Input<FormValues extends FieldValues>({
  className,
  label,
  name,
  value,
  onChange,
  clearable,
  onClear,
  icon,
  endIcon,
  iconSize = 24,
  iconHeight = 24,
  iconType = "md",
  loading,
  error,
  filled,
  labelOnTop,
  formatter,
  field,
  formState,
  noMouseEvent,
  focused,
  disabled,
  withoutFormField,
  onFocus,
  onBlur,
  placeholder,
  ...rest
}: InputProps<FormValues>) {
  const formattedValue = useFormattedValue(field, value)?.toString() || ""
  const formattedError = useFormattedError(name, formState, error)
  // If there is an error, it will replace the icon with an error icon
  if (!!formattedError) {
    if (!!icon) {
      icon = "error"
    } else {
      endIcon = "error"
    }
  }

  const handleClear = useCallback(() => {
    if (disabled) return
    if (!!onClear) {
      onClear(name)
    }
  }, [disabled, name, onClear])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || noMouseEvent) return
      if (!!onChange) {
        let changedValue = e.currentTarget.value
        if (!!formatter) {
          if (formatter instanceof Array) {
            formatter.forEach((formatterName) => {
              changedValue = inputFormat(formatterName, changedValue)
            })
          } else {
            changedValue = inputFormat(formatter, changedValue)
          }
        }
        if (!!onChange) {
          onChange(name, changedValue)
        }
      }
    },
    [disabled, name, noMouseEvent, formatter, onChange]
  )

  const isNeedToShowClearButton = useMemo(() => {
    return !disabled && !!clearable && !!onClear && !loading && !!formattedValue
  }, [clearable, disabled, formattedValue, loading, onClear])

  const FieldWrapper = !withoutFormField ? FormField : Fragment
  const fieldMethods = !withoutFormField
    ? {
        label: (!!labelOnTop && label) || undefined,
        error: formattedError,
        ...rest
      }
    : {}
  return (
    <FieldWrapper {...fieldMethods}>
      <div
        className={twMerge(
          cx(
            "input bg-form w-full h-12 relative rounded-md group",
            (loading || disabled) && "pointer-events-none",
            disabled && "bg-gray-900 opacity-80 text-gray-400",
            className
          )
        )}
      >
        {!!icon && (
          <Icon
            type={iconType}
            name={icon}
            size={iconSize}
            customIconLink={icon}
            width={iconSize}
            height={iconHeight || iconSize}
            alt={icon}
            className={twMerge(
              cx(
                "input-icon absolute left-2 top-4",
                formattedError && "text-cancel-main"
              )
            )}
          />
        )}
        <input
          className={twMerge(
            cx(
              "peer bg-transparent w-full h-full focus:outline-none px-4 py-2 overflow-hidden text-ellipsis border-0 box-border placeholder-form",
              "focus:placeholder-gray-500 focus:placeholder-opacity-80",
              icon && "pl-10",
              isNeedToShowClearButton && "pr-10",
              (!!endIcon || !!loading) && "pr-10",
              isNeedToShowClearButton && (!!endIcon || !!loading) && "pr-16",
              noMouseEvent && "pointer-events-none",
              "placeholder:select-none"
            )
          )}
          onChange={handleChange}
          {...rest}
          value={formattedValue}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder || label}
        />
        {!labelOnTop && !!label && (
          <label
            className={twMerge(
              cx(
                "text-ellipsis absolute left-0 top-0 z-[1] pointer-events-none p-0 overflow-hidden transition-transform origin-top-left",
                "scale-75 -translate-y-3 translate-x-4",
                "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:translate-x-4",
                "peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-4 peer-focus-visible:scale-75",
                icon &&
                  "peer-placeholder-shown:translate-x-10 peer-focus:translate-x-4",
                filled &&
                  "translate-y-0 scale-75 opacity-60 peer-focus:translate-y-0 peer-focus:scale-75 peer-placeholder-shown:top-0 peer-placeholder-shown:opacity-100 peer-focus:opacity-60",
                filled &&
                  icon &&
                  "translate-x-10 peer-placeholder-shown:translate-x-10 peer-focus:translate-x-10"
              )
            )}
          >
            <Text className={"label-text"} type="fit-line">
              {label}
            </Text>
          </label>
        )}
        <fieldset
          className={twMerge(
            cx(
              "pointer-events-none min-w-0 border border-gray-500 absolute bottom-0 left-0 right-0 h-[60px] box-content rounded-md overflow-hidden px-4",
              "group-focus-within:border-primary-main",
              formattedError && "border-cancel-main",
              filled && "inset-0 h-12",
              focused && "border-primary-main"
            )
          )}
          aria-hidden
        >
          {!labelOnTop && !filled && label && (
            <legend
              className={twMerge(
                cx(
                  "-ml-1.5 w-fit overflow-hidden text-nowrap block p-0 transition-opacity duration-300 ease-in-out",
                  "invisible opacity-0 max-w-[0.01px]",
                  !!formattedValue && "opacity-100 visible max-w-full",
                  "group-focus-within:opacity-100 group-focus-within:visible group-focus-within:max-w-full",
                  "group-focus-visible:opacity-100 group-focus-visible:visible group-focus-visible:max-w-full"
                )
              )}
            >
              <Text
                className="opacity-0 text-xs/[1.5rem] px-1.5"
                type="fit-line"
              >
                {label}
              </Text>
            </legend>
          )}
        </fieldset>
        {!!isNeedToShowClearButton && (
          <Button
            className={twMerge(
              cx(
                "input-clear-button",
                "absolute right-2 top-1 text-gray-400",
                (!!endIcon || !!loading) && "right-7"
              )
            )}
            icon="clear"
            text
            iconSize={24}
            onClick={handleClear}
            isNoPadding
            remove
          />
        )}
        {!!endIcon && !loading && (
          <Icon
            type={iconType}
            name={endIcon}
            size={iconSize}
            customIconLink={endIcon}
            width={iconSize}
            height={iconHeight || iconSize}
            alt={endIcon}
            className={twMerge(
              cx(
                "input-icon absolute right-2 top-4",
                formattedError && "text-cancel-main"
              )
            )}
          />
        )}
        {!!loading && (
          <div className={"input-loader absolute right-2 top-3"}>
            <Loader size="sm" />
          </div>
        )}
      </div>
    </FieldWrapper>
  )
}
export default Input
