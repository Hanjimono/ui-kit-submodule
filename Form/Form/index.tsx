"use client"
// System
import { Children, isValidElement, cloneElement } from "react"
import clsx from "clsx"
import { FieldErrors, FieldValues, Path, useForm } from "react-hook-form"
// Ui
import Beam from "@/ui/Layout/Beam"
import FormSubmit from "@/ui/Form/FormSubmit"
// Styles and types
import { FormProps } from "./types"
import { FormElement } from "../types"
import { FormSubmitProps } from "@/ui/Form/FormSubmit/types"
import styles from "./styles.module.scss"

function Form<FormValues extends FieldValues>({
  children,
  className,
  onChange,
  onSubmit,
  onInvalidSubmit,
  ...rest
}: FormProps<FormValues>) {
  const { register, resetField, setValue, handleSubmit } = useForm<FormValues>()
  const handleChange = (name: Path<FormValues>, value: any) => {
    setValue(name, value)
    if (!!onChange) {
      onChange(name, value)
    }
  }
  const handleClear = (name: Path<FormValues>) => {
    resetField(name)
    if (!!onChange) {
      onChange(name, undefined)
    }
  }
  const handleFormSubmit = (data: FormValues) => {
    if (!!onSubmit) {
      onSubmit(data)
    }
  }
  const handleInvalidSubmit = (errors: FieldErrors<FormValues>) => {
    if (!!onInvalidSubmit) {
      onInvalidSubmit(errors)
    }
  }
  const calculatedClassNames = clsx(styles["form"], className)
  let childrenWithProps = Children.map(children, (child) => {
    if (
      isValidElement<FormSubmitProps>(child) &&
      (child as React.ReactElement<any>).type === FormSubmit
    ) {
      return cloneElement(child, {
        onSubmit: handleSubmit(
          (data) => handleFormSubmit(data),
          (errors) => handleInvalidSubmit(errors)
        )
      })
    }
    if (isValidElement<FormElement<FormValues>>(child)) {
      return cloneElement(child, {
        onChange: handleChange,
        onClear: handleClear,
        register
      })
    }
    return child
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className={calculatedClassNames}
    >
      <Beam className={styles["form-content-container"]} {...rest}>
        {childrenWithProps}
      </Beam>
    </form>
  )
}
export default Form
