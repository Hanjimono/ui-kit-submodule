import { Gap } from "../Gaper/types"

/** Room component that wraps its children with a motion div and applies conditional class names. */
export interface RoomProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Add margin gap to the bottom */
  bottomGap?: Gap | true
  /** Remove gap between children */
  noGap?: boolean
}

/** Hidden Room - component that conditionally renders its children with animation. */
export interface HiddenRoomProps extends RoomProps {
  /** Flag to show or hide the element inside the frame */
  isShown?: boolean
  /** Animation mode for animate presence*/
  mode?: "sync" | "popLayout" | "wait"
}
