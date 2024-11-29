"use client"
// System
import { AnimatePresence } from "framer-motion"
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import { FieldValues } from "react-hook-form"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
// Logic
import { useFormattedError, useFormattedValue } from "@/ui/Form/Hooks"
// Ui
import FormField from "@/ui/Form/Field"
import Input from "@/ui/Form/Input"
import PopupContainer from "@/ui/Skeleton/PopupContainer"
import Portal from "@/ui/Skeleton/Portal"
// Styles and types
import { SelectProps, DefaultSelectOption } from "./types"

/**
 * Renders a selectable option for a custom select component.
 *
 * @template SelectOptionType - The type of the select option, extending DefaultSelectOption.
 * @param {Object} props - The properties object.
 * @param {SelectOptionType} props.option - The option to be rendered.
 * @param {(option: SelectOptionType) => void} props.onSelect - The callback function to be called when the option is selected.
 * @param {boolean} props.selected - Indicates whether the option is currently selected.
 * @returns {JSX.Element} The rendered select option component.
 */
function RenderSelectOption<SelectOptionType extends DefaultSelectOption>({
  option,
  onSelect,
  selected
}: {
  option: SelectOptionType
  onSelect: (option: SelectOptionType) => void
  selected: boolean
}) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onSelect(option)
  }
  return (
    <div
      className={twMerge(
        cx(
          "select-option cursor-pointer p-2 hover:bg-primary-hover rounded-md",
          selected && "bg-primary-hover"
        )
      )}
      onClick={(e) => handleClick(e)}
    >
      {option.title}
    </div>
  )
}

/**
 * The gap in pixels between the select element and its options.
 * This constant is used to define the spacing for dropdown options.
 */
const GAP_BETWEEN_SELECT_AND_OPTION = 5

/** Checks if an array includes a specific element. */
const includes = <T,>(arr: readonly T[], x: T): boolean => arr.includes(x)

/**
 * A custom select component that integrates with form handling libraries.
 * Can be used with react-hook-form or standalone.
 *
 * @template SelectOptionType - The type of the options available for selection.
 * @template FormValues - The type of the form values.
 *
 * @param {SelectProps<SelectOptionType, FormValues>} props - The properties for the Select component.
 * @param {string} props.className - Additional class names for styling the select component.
 * @param {string} props.name - The name of the field in the form.
 * @param {FieldPath<FormValues>} props.field - The field object from the form.
 * @param {FormState<FormValues>} props.formState - The state of the form.
 * @param {SelectOptionType[]} props.options - The options available for selection.
 * @param {string | number | string[] | numbers[]} props.value - The value of the select component.
 * @param {(name: string, value: any) => void} [props.onChange] - Callback function to handle value changes.
 * @param {boolean} [props.openOnTop] - Whether the options menu should open above the select component.
 * @param {string} [props.error] - Error message to display.
 * @param {boolean} [props.disabled] - Whether the select component is disabled.
 * @param {object} [props.rest] - Additional properties to pass to the select component.
 * @param {boolean} [props.multiselect] - Whether the select component should allow multiple selections.
 * @param {string} [props.label] - The label for the select component.
 * @param {boolean} [props.labelOnTop] - Whether the label should be displayed on top of the select component.
 * @param {boolean} [props.autocomplete] - Whether the select component should have autocomplete enabled.
 * @param {(name: string, value: string) => void} [props.onBlur] - Callback function to handle blur events.
 * @param {(name: string, value: string) => void} [props.onFocus] - Callback function to handle focus events.
 *
 * @returns {JSX.Element} The rendered select component.
 */
function Select<
  SelectOptionType extends DefaultSelectOption,
  FormValues extends FieldValues
>({
  className,
  name,
  field,
  formState,
  options,
  value,
  onChange,
  openOnTop,
  error,
  disabled,
  multiselect,
  label,
  labelOnTop,
  autocomplete,
  onBlur,
  onFocus,
  onClear,
  loading,
  ...rest
}: SelectProps<SelectOptionType, FormValues>) {
  const formattedValue = useFormattedValue(field, value)
  const selectedOptions = useMemo(() => {
    return options.filter((option) =>
      Array.isArray(formattedValue)
        ? includes(formattedValue, option.value)
        : option.value === formattedValue
    )
  }, [formattedValue, options])
  const selectedOptionsTitle = useMemo(() => {
    return selectedOptions.map((option) => option.title).join(", ")
  }, [selectedOptions])
  const selectRef = useRef<HTMLDivElement>(null)
  const [isOptionMenuShown, setIsOptionMenuShown] = useState(false)
  const [autocompleteValue, setAutocompleteValue] =
    useState(selectedOptionsTitle)
  const [selectPosition, setSelectPosition] = useState<DOMRect | undefined>(
    undefined
  )

  const handleMenuClose = useCallback(() => {
    if (autocomplete) {
      setAutocompleteValue(selectedOptionsTitle)
    }
    if (isOptionMenuShown) {
      setIsOptionMenuShown(false)
    }
  }, [
    isOptionMenuShown,
    selectedOptionsTitle,
    setAutocompleteValue,
    autocomplete
  ])

  /**
   * Adds event listeners to every resize and scroll option.
   * Because of the way the select component is rendered, we need to close the dropdown menu on scroll and resize.
   */
  useEffect(() => {
    const handleCloseSelect = (event: Event) => {
      const target = event.target as HTMLElement
      if (
        target &&
        target.closest &&
        target.closest(".select-exclude-scroll")
      ) {
        return
      }
      handleMenuClose()
    }

    document.addEventListener("scroll", handleCloseSelect, true)
    window.addEventListener("resize", handleCloseSelect)
    return () => {
      document.removeEventListener("scroll", handleCloseSelect, true)
      window.removeEventListener("resize", handleCloseSelect)
    }
  }, [isOptionMenuShown, handleMenuClose])

  const formattedError = useFormattedError(name, formState, error)

  /**
   * Handles the selection of an option in the select component.
   *
   * @param {SelectOptionType} option - The option that was selected.
   *
   * If the component is a multiselect, it will update the selected values by either adding or removing the selected option.
   * If the component is not a multiselect, it will set the selected value to the selected option and hide the options menu.
   *
   * @returns {void}
   */
  const handleSelect = useCallback(
    (option: SelectOptionType) => {
      if (multiselect) {
        if (!formattedValue) {
          onChange?.(name, [option.value])
          return
        }
        const selectedValues = Array.isArray(formattedValue)
          ? formattedValue
          : [formattedValue]
        const newValues = includes(selectedValues, option.value)
          ? selectedValues.filter((value) => value !== option.value)
          : [...selectedValues, option.value]
        onChange?.(name, newValues)
      } else {
        setIsOptionMenuShown(false)
        onChange?.(name, option.value)
        if (autocomplete) {
          setAutocompleteValue(option.title)
        }
      }
    },
    [formattedValue, multiselect, name, onChange, autocomplete]
  )

  const handleOpenSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || loading) {
      return
    }
    setSelectPosition(selectRef.current?.getBoundingClientRect())
    if (isOptionMenuShown && disabled) {
      return
    }
    const target = e.target as HTMLElement
    if (target && target.closest(".input-clear-button")) {
      return
    }
    setIsOptionMenuShown(true)
  }

  const formattedOptions = useMemo(() => {
    return autocompleteValue && autocomplete
      ? options.filter((option) =>
          option.title.toLowerCase().includes(autocompleteValue.toLowerCase())
        )
      : options
  }, [autocomplete, autocompleteValue, options])

  const handleChangeAutocomplete = (name: string, value: string) => {
    setAutocompleteValue(value)
  }
  const handleClear = useCallback(() => {
    onClear?.(name)
    if (autocomplete) {
      setAutocompleteValue("")
    }
  }, [onClear, name, autocomplete])
  return (
    <FormField {...rest} label={(!!labelOnTop && label) || undefined}>
      <div
        ref={selectRef}
        className={twMerge(
          cx("select cursor-pointer", disabled && "cursor-default", className)
        )}
        onClick={handleOpenSelect}
      >
        <Input
          label={label}
          name={name}
          {...rest}
          onChange={handleChangeAutocomplete}
          value={
            isOptionMenuShown && autocomplete
              ? autocompleteValue
              : selectedOptionsTitle
          }
          loading={loading}
          noMouseEvent={!autocomplete}
          focused={isOptionMenuShown}
          endIcon={isOptionMenuShown ? "arrow_drop_up" : "arrow_drop_down"}
          error={formattedError}
          disabled={disabled}
          withoutFormField
          onClear={handleClear}
        />
        {
          <Portal>
            <AnimatePresence>
              {isOptionMenuShown && (
                <PopupContainer
                  className={
                    "select-exclude-scroll select-option-popup w-full bg-form-main p-2 pr-0 rounded-md shadow-md border border-form-border box-border overflow-hidden"
                  }
                  isActive={isOptionMenuShown}
                  onClose={handleMenuClose}
                  checkOuterClick
                  parentPositionSettings={selectPosition}
                  positionDirection={openOnTop ? "top" : "bottom"}
                  positionOffset={GAP_BETWEEN_SELECT_AND_OPTION}
                  autoReposition
                  excludeClickListenerList={["." + name + "-select-exclude"]}
                  animationProps={{
                    initial: { scale: 0.8, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    exit: { scale: 0.8, opacity: 0, pointerEvents: "none" },
                    transition: { scale: { bounce: 0, duration: 0.2 } }
                  }}
                >
                  <div
                    className={
                      "select-option-container flex flex-col max-h-56 overflow-y-auto gap-1 pr-2"
                    }
                  >
                    {formattedOptions.map((option, idx) => (
                      <RenderSelectOption
                        key={idx}
                        option={option}
                        onSelect={() => handleSelect(option)}
                        selected={
                          Array.isArray(formattedValue)
                            ? includes(formattedValue, option.value)
                            : option.value === formattedValue
                        }
                      />
                    ))}
                  </div>
                </PopupContainer>
              )}
            </AnimatePresence>
          </Portal>
        }
      </div>
    </FormField>
  )
}
export default Select
