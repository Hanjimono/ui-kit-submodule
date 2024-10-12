"use client"
// System
import { Children, Fragment } from "react"
import clsx from "clsx"
import { FieldValues, FormProvider, useForm } from "react-hook-form"
// Ui
import Beam from "@/ui/Layout/Beam"
import FormElementWrapper from "@/ui/Form/FormElementWrapper"
// Styles and types
import { FormProps } from "./types"
import styles from "./styles.module.scss"

/**
 * Form component that wraps its children with form-related context and functionality.
 *
 * @template FormValues - The type of the form values.
 *
 * @param {FormProps<FormValues>} props - The properties for the Form component.
 * @param {React.ReactNode} props.children - The child elements to be rendered within the form.
 * @param {string} [props.className] - Additional class names to apply to the form.
 * @param {Function} [props.onChange] - Callback function to handle form change events.
 * @param {Function} [props.onSubmit] - Callback function to handle form submit events.
 * @param {Function} [props.onInvalidSubmit] - Callback function to handle invalid form submit events.
 * @param {boolean} [props.useContext] - Flag to determine if FormProvider context should be used.
 * @param {Object} rest - Additional properties to be passed to the form.
 *
 * @returns {JSX.Element} The rendered Form component.
 */
function Form<FormValues extends FieldValues>({
  children,
  className,
  onChange,
  onSubmit,
  onInvalidSubmit,
  useContext,
  ...rest
}: FormProps<FormValues>) {
  const { register, resetField, setValue, handleSubmit, ...restMethods } =
    useForm<FormValues>()
  const calculatedClassNames = clsx(styles["form"], className)
  let childrenWithWrapper = Children.map(
    Children.toArray(children),
    (child) => {
      return (
        <FormElementWrapper
          register={register}
          resetField={resetField}
          setValue={setValue}
          handleSubmit={handleSubmit}
          onChange={onChange}
          onSubmit={onSubmit}
          onInvalidSubmit={onInvalidSubmit}
        >
          {child}
        </FormElementWrapper>
      )
    }
  )
  const FormWrapper = useContext ? FormProvider : Fragment
  const formMethods = useContext
    ? { ...restMethods, register, resetField, setValue, handleSubmit }
    : {}
  return (
    <FormWrapper<FormValues> {...(formMethods as any)}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className={calculatedClassNames}
      >
        <Beam className={styles["form-content-container"]} {...rest}>
          {childrenWithWrapper}
        </Beam>
      </form>
    </FormWrapper>
  )
}
export default Form
