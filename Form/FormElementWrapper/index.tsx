// Styles and types
import {
  FieldErrors,
  FieldValues,
  Path,
  useController,
  useFormContext
} from "react-hook-form"
import {
  FormElementWrapperBaseProps,
  FormElementWrapperProps,
  ControlledFormElementWrapperProps
} from "./types"
import { Children, cloneElement, isValidElement, useMemo } from "react"
import { FormElement } from "../types"
import { FormSubmitProps } from "../FormSubmit/types"
import FormSubmit from "../FormSubmit"

/**
 * A wrapper component for form elements that provides additional functionality
 * such as handling changes, clearing fields, and form submission.
 * Usually it automatically wraps all form elements inside the Form component.
 * But you can use it manually to wrap nested components inside FormElementNestedWrapper.
 * For deeply nested components you can use FormElementNestedWrapper.
 *
 * @template FormValues - The type of the form values.
 *
 * @param {FormElementWrapperProps<FormValues>} props - The properties for the FormElementWrapper component.
 * @param {React.ReactNode} props.children - The child components to be wrapped.
 * @param {Function} props.resetField - The function from react-hook-form to reset a specific field.
 * @param {Function} props.setValue - The function from react-hook-form to set the value of a specific field.
 * @param {Function} props.handleSubmit - The function from react-hook-form to handle form submission.
 * @param {Function} props.onChange - The callback function to handle changes in form fields.
 * @param {Function} props.onSubmit - The callback function to handle successful form submission.
 * @param {Function} props.onInvalidSubmit - The callback function to handle form submission with validation errors.
 * @param {Control} props.control - The react-hook-form control object.
 *
 * @returns {JSX.Element} The wrapped form elements with additional props and functionality.
 */
export function FormElementWrapper<FormValues extends FieldValues>({
  children,
  resetField,
  setValue,
  handleSubmit,
  onChange,
  onSubmit,
  onInvalidSubmit,
  control
}: FormElementWrapperProps<FormValues>) {
  // Memoize the children with additional props to avoid unnecessary re-renders
  const childrenWithProps = useMemo(() => {
    // Handle change event for form elements
    const handleChange = (name: Path<FormValues>, value: any) => {
      if (setValue) {
        setValue(name, value, { shouldTouch: true })
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
        const name = child.props.name
        const clonnedChild = cloneElement(child, {
          onChange: handleChange,
          onClear: handleClear
        })
        if (!control) {
          return clonnedChild
        }
        return (
          <ControlledFormElementWrapper<FormValues>
            key={name}
            name={name}
            control={control}
          >
            {clonnedChild}
          </ControlledFormElementWrapper>
        )
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
      if (
        isValidElement<FormElementWrapperProps<FormValues>>(child) &&
        (child as React.ReactElement<any>).type === FormElementNestedWrapper
      ) {
        return cloneElement(child, {
          handleSubmit,
          onChange,
          onSubmit,
          onInvalidSubmit,
          resetField,
          setValue,
          control
        })
      }
      return child
    })
  }, [
    children,
    handleSubmit,
    onChange,
    onSubmit,
    onInvalidSubmit,
    resetField,
    setValue,
    control
  ])

  return <>{childrenWithProps}</>
}

/**
 * A wrapper component for deeply nested form elements. It will add the form control props to the form element.
 * You can also pass additional custom control props that will be passed to the form element and it will work
 * the same way, as props in the Form component.
 *
 * @template FormValues - The type of the form values.
 *
 * @param {FormElementWrapperProps<FormValues>} props - The properties for the FormElementWrapper component.
 * @param {React.ReactNode} props.children - The child components to be wrapped.
 * @param {Function} props.onChange - The callback function to handle changes in form fields.
 * @param {Function} props.onSubmit - The callback function to handle successful form submission.
 * @param {Function} props.onInvalidSubmit - The callback function to handle form submission with validation errors.
 */
export function FormContextElementWrapper<FormValues extends FieldValues>({
  children,
  onChange,
  onSubmit,
  onInvalidSubmit
}: FormElementWrapperBaseProps<FormValues>) {
  const { resetField, setValue, handleSubmit, control } =
    useFormContext<FormValues>()
  return (
    <FormElementWrapper<FormValues>
      resetField={resetField}
      setValue={setValue}
      handleSubmit={handleSubmit}
      onChange={onChange}
      onSubmit={onSubmit}
      onInvalidSubmit={onInvalidSubmit}
      control={control}
    >
      {children}
    </FormElementWrapper>
  )
}

/**
 * A wrapper component for nested form elements. It will search for FormElementWrapper components inside its children.
 * Than, it pass all form control props to the FormElementWrapper and to actual form elements.
 *
 * @template FormValues - The type of the form values.
 *
 * @returns {React.ReactNode} The cloned children with the additional props.
 */
export function FormElementNestedWrapper<FormValues extends FieldValues>({
  children,
  ...rest
}: FormElementWrapperProps<FormValues>) {
  const childrenWithProps = useMemo(() => {
    const recursivelyCloneChildren = (
      children: React.ReactNode
    ): React.ReactNode => {
      return Children.map(children, (child) => {
        if (isValidElement(child)) {
          if (child.type === FormElementWrapper) {
            return cloneElement(child, {
              ...rest
            })
          } else if (child.props && child.props.children) {
            return cloneElement(child as React.ReactElement<any>, {
              children: recursivelyCloneChildren((child.props as any).children)
            })
          }
        }
        return child
      })
    }

    return recursivelyCloneChildren(children)
  }, [children, rest])
  return <>{childrenWithProps}</>
}

export function ControlledFormElementWrapper<FormValues extends FieldValues>({
  children,
  control,
  name
}: ControlledFormElementWrapperProps<FormValues>) {
  const { field, formState } = useController<FormValues>({
    name,
    control
  })
  const childrenWithProps: React.ReactNode = Children.map(
    children,
    (child): React.ReactNode => {
      if (isValidElement<FormElement<FormValues>>(child) && child.props.name) {
        return cloneElement(child, {
          field,
          formState
        })
      }
    }
  )
  return <>{childrenWithProps}</>
}

export default FormElementWrapper
