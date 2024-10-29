/** Portal component that renders its children into a DOM node outside of the current DOM hierarchy. */
export interface PortalProps {
  /** React children */
  children?: React.ReactNode
  /** The CSS selector of the target DOM node where the portal should be rendered. If not provided, defaults to `document.body`.*/
  selector?: string
}
