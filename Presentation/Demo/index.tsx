"use client"
// System
import { useState } from "react"
// Ui
import { formatClassnames } from "@/ui/Skeleton/utils"
import Brick from "@/ui/Layout/Brick"
import Code from "@/ui/Presentation/Code"
import { TabPanel, Tab } from "@/ui/Navigation/TabPanel"
// Styles and types
import { DemoProps } from "./types"

/**
 * The `Demo` component is used to display a demonstration and its corresponding code.
 * It provides a tabbed interface to switch between the demo view and the code view.
 *
 * @param {DemoProps} props - The properties for the Demo component.
 * @param {React.ReactNode} props.children - The content to be displayed in the demo view.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @param {string} props.code - The code to be displayed in the code view.
 * @param {boolean} [props.withoutCopy] - If true, the copy button will be hidden in the code view.
 *
 * @returns {JSX.Element} The rendered Demo component.
 */
function Demo({ children, className, code, withoutCopy, ...rest }: DemoProps) {
  const calculatedClassNames = formatClassnames("demo max-w-full", className)
  const [showCode, setShowCode] = useState(false)
  return (
    <Brick className={calculatedClassNames} {...rest}>
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
      {!showCode && (
        <div className={"max-w-full pt-6 pb-2 px-6"}>{children}</div>
      )}
      {showCode && (
        <Brick square>
          <Code code={code} withoutCopy={withoutCopy} />
        </Brick>
      )}
    </Brick>
  )
}
export default Demo
