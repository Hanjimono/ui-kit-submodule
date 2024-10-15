// System
import clsx from "clsx"
// Ui
import Button from "@/ui/Actions/Button"
// Types and styles
import { CodeProps } from "./types"
import styles from "./styles.module.scss"

/**
 * Renders a block of code with optional line numbers and a copy-to-clipboard button.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.code=""] - The code to be displayed.
 * @param {string} [props.className] - Additional class names to apply to the code block.
 * @param {boolean} [props.withoutCopy] - If true, the copy-to-clipboard button will not be rendered.
 *
 * @returns {JSX.Element} The rendered code block component.
 */
function Code({ code = "", className, withoutCopy }: CodeProps) {
  const calculatedClassNames = clsx(styles["code"], className)
  const codeSplitByLines = code.split(/\r?\n|\r|\n/g)
  if (codeSplitByLines[0] === "") {
    codeSplitByLines.shift()
  }
  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code)
  }
  return (
    <div className={calculatedClassNames}>
      {!withoutCopy && (
        <Button
          className={styles["copy-button"]}
          icon="content_copy"
          iconType="md"
          iconSize={24}
          text
          onClick={() => copyCodeToClipboard()}
        />
      )}
      {codeSplitByLines.length > 0 &&
        codeSplitByLines.map((line, index) => (
          <div key={index} className={styles["line"]}>
            <span className={styles["line-number"]}>{index + 1}</span>
            <span className={styles["line-text"]}>
              {line.replaceAll(" ", "\u00a0")}
            </span>
          </div>
        ))}
    </div>
  )
}
export default Code
