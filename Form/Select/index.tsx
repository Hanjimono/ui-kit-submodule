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

const GAP_BETWEEN_SELECT_AND_OPTION = 5

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
  const calculatedClassNames = clsx(styles["select-container"], className)
  const [isOptionMenuShown, setIsOptionMenuShown] = useState(false)
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    width: 0
  } as PopupPosition)

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
