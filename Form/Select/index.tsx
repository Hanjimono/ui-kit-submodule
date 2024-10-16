"use client"
// System
import clsx from "clsx"
import { FieldValues } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
// Ui
import Input from "@/ui/Form/Input"
import PopupContainer from "@/ui/Skeleton/PopupContainer"
import { PopupPosition } from "@/ui/Skeleton/PopupContainer/types"
// Styles and types
import { SelectProps, DefaultSelectOption } from "./types"
import styles from "./styles.module.scss"

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
      className={clsx(styles["select-option"], selected && styles["selected"])}
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
 * @param {string | number} [props.value] - The current value of the select component.
 * @param {(name: string, value: string | number) => void} [props.onChange] - Callback function to handle value changes.
 * @param {boolean} [props.openOnTop] - Whether the options menu should open above the select component.
 * @param {string} [props.error] - Error message to display.
 * @param {boolean} [props.disabled] - Whether the select component is disabled.
 * @param {object} [props.rest] - Additional properties to pass to the select component.
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
  ...rest
}: SelectProps<SelectOptionType, FormValues>) {
  const selectRef = useRef<HTMLDivElement>(null)
  const calculatedClassNames = clsx(
    styles["select-container"],
    className,
    disabled && styles["disabled"]
  )
  const [isOptionMenuShown, setIsOptionMenuShown] = useState(false)
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    width: 0
  } as PopupPosition)

  /**
   * Adds event listeners to every resize and scroll option.
   * Because of the way the select component is rendered, we need to close the dropdown menu on scroll and resize.
   */
  useEffect(() => {
    const handleCloseSelect = (event: Event) => {
      const target = event.target as HTMLElement
      if (target.closest(".select-exclude-scroll")) {
        return
      }

      if (isOptionMenuShown) {
        setIsOptionMenuShown(false)
      }
    }

    document.addEventListener("scroll", handleCloseSelect, true)
    window.addEventListener("resize", handleCloseSelect)
    return () => {
      document.removeEventListener("scroll", handleCloseSelect, true)
      window.removeEventListener("resize", handleCloseSelect)
    }
  }, [isOptionMenuShown])

  const formattedValue = value || (field && field.value)
  const formattedError =
    error ||
    (formState &&
      formState.errors[name] &&
      formState.errors[name].message &&
      formState.errors[name].message?.toString())
  const selectedOption = options.find(
    (option) => option.value === formattedValue
  )
  const handleSelect = (option: SelectOptionType) => {
    onChange?.(name, option.value)
    setIsOptionMenuShown(false)
  }
  /**
   * Handles the opening of the select dropdown menu.
   *
   * @param e - The mouse event triggered by clicking on the select component.
   *
   * This function performs the following actions:
   * - Prevents the dropdown from opening if the select component is disabled.
   * - Prevents the dropdown from opening if the click target is the clear button.
   * - Calculates the position of the dropdown menu relative to the select component.
   * - Sets the position of the dropdown menu based on the calculated values.
   * - Displays the dropdown menu.
   */
  const handleOpenSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return
    }
    const target = e.target as HTMLElement
    if (target && target.closest(".input-clear-button")) {
      return
    }
    const {
      top,
      left,
      width,
      bottom = 0,
      height = 0
    } = selectRef.current?.getBoundingClientRect() || {
      top: 0,
      left: 0,
      width: 0
    }
    setMenuPosition({
      top: openOnTop ? undefined : top + height + GAP_BETWEEN_SELECT_AND_OPTION,
      bottom: openOnTop
        ? window.innerHeight - bottom + height + GAP_BETWEEN_SELECT_AND_OPTION
        : undefined,
      left,
      width
    })
    setIsOptionMenuShown(true)
  }
  return (
    <div
      ref={selectRef}
      className={calculatedClassNames}
      onClick={handleOpenSelect}
    >
      <Input
        name={name}
        {...rest}
        value={selectedOption?.title}
        noMouseEvent
        focused={isOptionMenuShown}
        endIcon={isOptionMenuShown ? "arrow_drop_up" : "arrow_drop_down"}
        error={formattedError}
        disabled={disabled}
      />
      {isOptionMenuShown &&
        createPortal(
          <PopupContainer
            className={clsx(
              styles["select-option-popup"],
              "select-exclude-scroll"
            )}
            isActive={isOptionMenuShown}
            onClose={() => setIsOptionMenuShown(false)}
            checkOuterClick
            position={menuPosition}
          >
            <div className={styles["select-option-container"]}>
              {options.map((option, idx) => (
                <RenderSelectOption
                  key={idx}
                  option={option}
                  onSelect={() => handleSelect(option)}
                  selected={option.value === formattedValue}
                />
              ))}
            </div>
          </PopupContainer>,
          document.body
        )}
    </div>
  )
}
export default Select
