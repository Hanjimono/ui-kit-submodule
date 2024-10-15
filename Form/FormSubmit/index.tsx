// Ui
import Button from "@/ui/Actions/Button"
// Styles and types
import { FormSubmitProps } from "./types"

/**
 * FormSubmit component renders a button that triggers the provided onSubmit function when clicked.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.onSubmit - The function to call when the button is clicked.
 * @param {React.ReactNode} props.children - The content to display inside the button.
 * @param {Object} [props.rest] - Additional properties to pass to the Button component.
 *
 * @returns {JSX.Element} The rendered button component.
 */
function FormSubmit({ onSubmit, children, ...rest }: FormSubmitProps) {
  return (
    <Button onClick={onSubmit} {...rest}>
      {children}
    </Button>
  )
}
export default FormSubmit
