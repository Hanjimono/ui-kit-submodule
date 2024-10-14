"use client"
// System
import { Children, Fragment } from "react"
import clsx from "clsx"
import { FieldValues, FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
// Ui
import Beam from "@/ui/Layout/Beam"
import FormElementWrapper from "@/ui/Form/FormElementWrapper"
// Styles and types
import { FormProps } from "./types"
import styles from "./styles.module.scss"
import * as yup from "yup"

/**
 * Form component that wraps its children with form-related context and functionality.
 * It provides a form element with children inside a Beam(row) component.
 * Form controls are managed by react-hook-form and will be passed to children form elements.
 * You can pass a custom useForm hook methods to the form or use the default one.
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
 * @param {UseFormReturn<FormValues, any, undefined>} [props.methods] - The react-hook-form methods to use for the form.
 * @param {DefaultValues<FormValues>} [props.defaultValues] - The default values for the form.
 * @param {ObjectSchema<FormValues>} [props.validationSchema] - The validation schema for the form generated with yup.
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
  methods,
  defaultValues,
  validationSchema = yup.object<FormValues>().shape({}) as any,
  ...rest
}: FormProps<FormValues>) {
  const defaultMethods = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(validationSchema) as any,
    defaultValues: defaultValues
  })
  const { resetField, setValue, handleSubmit, control, ...restMethods } =
    methods || defaultMethods
  const calculatedClassNames = clsx(styles["form"], className)
  let childrenWithWrapper = Children.map(
    Children.toArray(children),
    (child) => {
      return (
        <FormElementWrapper
          resetField={resetField}
          setValue={setValue}
          handleSubmit={handleSubmit}
          onChange={onChange}
          onSubmit={onSubmit}
          onInvalidSubmit={onInvalidSubmit}
          control={control}
        >
          {child}
        </FormElementWrapper>
      )
    }
  )
  const FormWrapper = useContext ? FormProvider : Fragment
  const formMethods = useContext
    ? { ...restMethods, resetField, setValue, handleSubmit, control }
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
