"use client"
// System
import { useState } from "react"
import clsx from "clsx"
// Ui
import Button from "@/ui/Actions/Button"
import Brick from "@/ui/Layout/Brick"
import Code from "@/ui/Presentation/Code"
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
        <Button onClick={() => setShowCode(!showCode)} blue transparent>
          {showCode ? "Hide code" : "Show code"}
        </Button>
      </div>
      {showCode && <Code className={styles["demo-code"]} code={code} withoutCopy={withoutCopy} />}
    </Brick>
  )
}
export default Demo
