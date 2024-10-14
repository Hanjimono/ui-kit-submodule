// Ui
import Button from "@/ui/Actions/Button"
// Styles and types
import { FormSubmitProps } from "./types"

/** Special button for form submitting */
function FormSubmit({ onSubmit, children, ...rest }: FormSubmitProps) {
  return (
    <Button onClick={onSubmit} {...rest}>
      {children}
    </Button>
  )
}
export default FormSubmit
