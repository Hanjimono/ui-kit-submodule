// Ui
import Pillar from "@/ui/Layout/Pillar"
import Text from "@/ui/Presentation/Text"
// Styles and types
import { FormFieldProps } from "./types"
import { formatClassnames } from "@/ui/Skeleton/utils"

/**
 * Field component wraps a form element. It's also can be used to display a label and error message.
 * It's accept the same props as Pillar component.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the form field.
 * @param {string} [props.className] - Additional class names to apply to the form field.
 * @param {string} [props.label] - The label text for the form field.
 * @param {string} [props.error] - The error message to display if there is an error.
 * @param {boolean} [props.fakeLabel] - Flag to indicate if a fake label should be rendered.
 * @param {Object} [props.rest] - Additional properties to be passed to the Pillar component.
 * @returns {JSX.Element} The rendered form field component.
 */
function FormField({
  children,
  className,
  label,
  error,
  fakeLabel,
  ...rest
}: FormFieldProps) {
  const calculatedClassNames = formatClassnames(
    "form-field relative flex flex-col",
    className
  )

  return (
    <Pillar className={calculatedClassNames} {...rest}>
      {(!!label || !!fakeLabel) && (
        <div className="min-h-6 max-h-6 mb-1">
          {label && <Text type="fit-line">{label}</Text>}
        </div>
      )}
      <div className="w-full">{children}</div>
      {!!error && (
        <div
          className={"text-cancel-main pr-2 absolute right-0 -bottom-[1.15rem]"}
        >
          <Text type="fit-line" size="extra-small">
            {error}
          </Text>
        </div>
      )}
    </Pillar>
  )
}
export default FormField
