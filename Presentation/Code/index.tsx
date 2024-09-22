// System
import clsx from "clsx"
// Ui
import Button from "@/ui/Actions/Button"
// Types and styles
import { CodeProps } from "./types"
import styles from "./styles.module.scss"

/** A block for code presentation with copy button */
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
