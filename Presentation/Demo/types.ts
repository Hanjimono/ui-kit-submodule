import { CodeProps } from "@/ui/Presentation/Code/types"
import { BrickProps } from "@/ui/Layout/Brick/types"

/**
 * The `Demo` component is used to display a demonstration and its corresponding code.
 * It provides a tabbed interface to switch between the demo view and the code view.
 */
export interface DemoProps extends BrickProps, CodeProps {}
