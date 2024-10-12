// Styles and types
import { FieldErrors, FieldValues, Path, useFormContext } from "react-hook-form"
import { FormElementWrapperBaseProps, FormElementWrapperProps } from "./types"
import { Children, cloneElement, isValidElement, useMemo } from "react"
import { FormElement } from "../types"
import { FormSubmitProps } from "../FormSubmit/types"
import FormSubmit from "../FormSubmit"

/**
 * A wrapper component for form elements that provides additional functionality
 * such as handling changes, clearing fields, and form submission.
 *
 * @template FormValues - The type of the form values.
 *
 * @param {FormElementWrapperProps<FormValues>} props - The properties for the FormElementWrapper component.
 * @param {React.ReactNode} props.children - The child components to be wrapped.
 * @param {Function} props.register - The register function from react-hook-form.
 * @param {Function} props.resetField - The function from react-hook-form to reset a specific field.
 * @param {Function} props.setValue - The function from react-hook-form to set the value of a specific field.
 * @param {Function} props.handleSubmit - The function from react-hook-form to handle form submission.
 * @param {Function} props.onChange - The callback function to handle changes in form fields.
 * @param {Function} props.onSubmit - The callback function to handle successful form submission.
 * @param {Function} props.onInvalidSubmit - The callback function to handle form submission with validation errors.
 *
 * @returns {JSX.Element} The wrapped form elements with additional props and functionality.
 */
export function FormElementWrapper<FormValues extends FieldValues>({
  children,
  register,
  resetField,
  setValue,
  handleSubmit,
  onChange,
  onSubmit,
  onInvalidSubmit
}: FormElementWrapperProps<FormValues>) {
  // Memoize the children with additional props to avoid unnecessary re-renders
  const childrenWithProps = useMemo(() => {
    // Handle change event for form elements
    const handleChange = (name: Path<FormValues>, value: any) => {
      if (setValue) {
        setValue(name, value)
      }
      if (onChange) {
        onChange(name, value)
      }
    }

    // Handle clear event for form elements
    const handleClear = (name: Path<FormValues>) => {
      if (resetField) {
        resetField(name)
      }
      if (onChange) {
        onChange(name, undefined)
      }
    }

    // Handle form submission
    const handleFormSubmit = (data: FormValues) => {
      if (onSubmit) {
        onSubmit(data)
      }
    }

    // Handle form submission with validation errors
    const handleInvalidSubmit = (errors: FieldErrors<FormValues>) => {
      if (onInvalidSubmit) {
        onInvalidSubmit(errors)
      }
    }

    // Clone children and add additional props
    return Children.map(children, (child) => {
      if (isValidElement<FormElement<FormValues>>(child) && child.props.name) {
        return cloneElement(child, {
          onChange: handleChange,
          onClear: handleClear,
          register
        })
      }
      if (
        isValidElement<FormSubmitProps>(child) &&
        (child as React.ReactElement<any>).type === FormSubmit &&
        handleSubmit
      ) {
        return cloneElement(child, {
          onSubmit: handleSubmit(
            (data) => handleFormSubmit(data),
            (errors) => handleInvalidSubmit(errors)
          )
        })
      }
      return child
    })
  }, [
    children,
    handleSubmit,
    register,
    onChange,
    onSubmit,
    onInvalidSubmit,
    resetField,
    setValue
  ])

  return <>{childrenWithProps}</>
}

export function FormContextElementWrapper<FormValues extends FieldValues>({
  children,
  onChange,
  onSubmit,
  onInvalidSubmit
}: FormElementWrapperBaseProps<FormValues>) {
  const { register, resetField, setValue, handleSubmit } =
    useFormContext<FormValues>()
  return (
    <FormElementWrapper<FormValues>
      register={register}
      resetField={resetField}
      setValue={setValue}
      handleSubmit={handleSubmit}
      onChange={onChange}
      onSubmit={onSubmit}
      onInvalidSubmit={onInvalidSubmit}
    >
      {children}
    </FormElementWrapper>
  )
}

export default FormElementWrapper
