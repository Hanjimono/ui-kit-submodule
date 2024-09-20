"use client"
// System
import { useState } from "react"
import clsx from "clsx"
// Ui
import Button from "@/ui/Actions/Button"
import Brick from "@/ui/Layout/Brick"
import Code from "@/ui/Presentation/Code"
import Text from "@/ui/Presentation/Text"
// Styles and types
import styles from "./styles.module.scss"
import { DemoProps } from "./types"

function Demo({ children, className, code, withoutCopy }: DemoProps) {
  const calculatedClassNames = clsx(styles["demo"], className)
  const [showCode, setShowCode] = useState(false)
  return (
    <Brick className={calculatedClassNames}>
      <div className={styles["demo-content"]}>{children}</div>
      <div className={styles["demo-action-panel"]}>
        <Button className={styles["demo-code-button"]} onClick={() => setShowCode(!showCode)} blue transparent>
          <Text type="fit-line" size="small">{showCode ? "Hide code" : "Show code"}</Text>
        </Button>
      </div>
      {showCode && <Code className={styles["demo-code"]} code={code} withoutCopy={withoutCopy} />}
    </Brick>
  )
}
export default Demo
