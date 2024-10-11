// Ui
import Button from "@/ui/Actions/Button"
// Styles and types
import { FormSubmitProps } from "./types"

function FormSubmit({ onSubmit, children, ...rest }: FormSubmitProps) {
  return (
    <Button onClick={onSubmit} {...rest}>
      {children}
    </Button>
  )
}
export default FormSubmit
