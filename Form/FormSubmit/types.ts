// types
import { ButtonProps } from "@/ui/Actions/Button/types"

/** Special button for form submitting */
export interface FormSubmitProps extends ButtonProps {
  onSubmit?: (e: React.BaseSyntheticEvent) => void
}
