"use client"
// System
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
// Styles and types
import { PortalProps } from "./types"

/**
 * Portal component that renders its children into a DOM node outside of the current DOM hierarchy.
 * It check if the client component properly mounted and works fine with server components.
 *
 * @param {PortalProps} props - The properties for the Portal component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the portal.
 * @param {string} props.selector - The CSS selector of the target DOM node where the portal should be rendered. If not provided, defaults to `document.body`.
 */
function Portal({ children, selector }: PortalProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = selector ? document.querySelector(selector) : document.body
    setMounted(true)
  }, [selector])
  return mounted && ref.current ? createPortal(children, ref.current) : null
}

export default Portal
