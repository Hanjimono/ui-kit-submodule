import { useEffect } from "react"

/**
 * Custom hook to handle clicks outside a specified element.
 *
 * @param {() => void} onOuterClick - Callback function to be called when an outside click is detected.
 * @param {React.RefObject<HTMLElement>} newRef - Reference to the element to detect outside clicks for.
 * @param {boolean} isActive - Flag that shows if an element is active. On not active element outside click will not be detected.
 * @param {boolean} [isNeedToListenEvent=true] - Flag to indicate if the event listener should be added.
 * @param {string[]} [excludeClickListenerList=[]] - List of selectors to exclude from outside click detection.
 */
export function useOuterClick(
  onOuterClick?: () => void | undefined,
  newRef: React.RefObject<HTMLElement> | null = null,
  isActive: boolean = true,
  isNeedToListenEvent: boolean = true,
  excludeClickListenerList: string[] = []
) {
  // Add or remove event listener for outside clicks based on checkOuterClick prop
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (excludeClickListenerList) {
        const target = e.target as HTMLElement
        if (
          target &&
          target.closest &&
          excludeClickListenerList.some((ref) => target.closest(ref))
        ) {
          return
        }
      }
      if (
        onOuterClick &&
        isActive &&
        newRef &&
        newRef.current &&
        !newRef.current.contains(e.target as Node)
      ) {
        setTimeout(onOuterClick, 100)
      }
    }
    if (isNeedToListenEvent) {
      document.addEventListener("mousedown", handleOutsideClick)
    }
    return () => {
      if (!isNeedToListenEvent) {
        document.removeEventListener("mousedown", handleOutsideClick)
      }
    }
  }, [
    newRef,
    isActive,
    onOuterClick,
    isNeedToListenEvent,
    excludeClickListenerList
  ])
}
