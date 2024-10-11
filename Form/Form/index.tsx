// System
import { Children, isValidElement, cloneElement } from "react"
import clsx from "clsx"
// Ui
import Beam from "@/ui/Layout/Beam"
// Styles and types
import { FormProps } from "./types"
import styles from "./styles.module.scss"
import { FormElement } from "../types"

function Form({ children, className, onChange, ...rest }: FormProps) {
  const calculatedClassNames = clsx(styles["form"], className)
  let childrenWithProps = Children.map(children, (child) => {
    if (isValidElement<FormElement>(child)) {
      return cloneElement(child, { onChange })
    }
    return child
  })
  return (
    <form className={calculatedClassNames}>
      <Beam className={styles["form-content-container"]} {...rest}>
        {childrenWithProps}
      </Beam>
    </form>
  )
}
export default Form
