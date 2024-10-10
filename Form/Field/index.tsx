// System
import clsx from "clsx"
// Ui
import Pillar from "@/ui/Layout/Pillar"
// Styles and types
import { FormFieldProps } from "./types"
import styles from "./styles.module.scss"
import Text from "@/ui/Presentation/Text"

function FormField({
  children,
  className,
  label,
  error,
  fakeLabel,
  ...rest
}: FormFieldProps) {
  const calculatedClassNames = clsx(
    styles["form-field"],
    className,
    !!fakeLabel && styles["with-fake-label"]
  )
  return (
    <Pillar className={calculatedClassNames} {...rest}>
      {(!!label || !!fakeLabel) && (
        <div className={styles["form-field-label"]}>
          {label && <Text type="fit-line">{label}</Text>}
        </div>
      )}
      <div className={styles["form-field-content"]}>{children}</div>
      {!!error && (
        <div className={styles["form-field-error"]}>
          <Text type="fit-line" size="extra-small">
            {error}
          </Text>
        </div>
      )}
    </Pillar>
  )
}
export default FormField
