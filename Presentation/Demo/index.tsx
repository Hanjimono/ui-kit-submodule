"use client"
// System
import { useState } from "react"
import clsx from "clsx"
// Ui
import Button from "@/ui/Actions/Button"
import Brick from "@/ui/Layout/Brick"
import Code from "@/ui/Presentation/Code"
import Text from "@/ui/Presentation/Text"
import { TabPanel, Tab } from "@/ui/Navigation/TabPanel"
// Styles and types
import styles from "./styles.module.scss"
import { DemoProps } from "./types"

function Demo({ children, className, code, withoutCopy }: DemoProps) {
  const calculatedClassNames = clsx(styles["demo"], className)
  const [showCode, setShowCode] = useState(false)
  return (
    <Brick className={calculatedClassNames}>
      <TabPanel>
        <Tab
          idx={0}
          isActive={!showCode}
          onTabChange={() => setShowCode(false)}
        >
          Demo
        </Tab>
        <Tab idx={1} isActive={showCode} onTabChange={() => setShowCode(true)}>
          Code
        </Tab>
      </TabPanel>
      {!showCode && <div className={styles["demo-content"]}>{children}</div>}
      {showCode && (
        <Brick className={styles["demo-code-container"]} square shadowless>
          <Code
            className={styles["demo-code"]}
            code={code}
            withoutCopy={withoutCopy}
          />
        </Brick>
      )}
    </Brick>
  )
}
export default Demo
