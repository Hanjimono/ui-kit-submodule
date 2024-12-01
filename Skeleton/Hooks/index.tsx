import { useEffect, useLayoutEffect, useState } from "react"

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

/**
 * Custom hook to dynamically get the height and width of a target container.
 *
 * @param {React.RefObject<HTMLElement> | null} targetRef - A reference to the target HTML element.
 * @param {boolean} [isActive] - A flag to determine if the hook should update the container sizes.
 * @returns {[number, number]} An array containing the height and width of the container.
 */
export function useDynamicContainerSizes(
  targetRef: React.RefObject<HTMLElement> | null = null,
  isActive?: boolean
) {
  const [containerHeight, setContainerHeight] = useState<number>(0)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  useLayoutEffect(() => {
    if (isActive) {
      setContainerHeight(targetRef?.current?.clientHeight || 0)
      setContainerWidth(targetRef?.current?.clientWidth || 0)
    }
  }, [targetRef, isActive])
  return [containerHeight, containerWidth]
}

/**
 * Custom hook that triggers a close function when the window is resized or scrolled.
 *
 * @param closeFunction - The function to be called when the window is resized or scrolled.
 * @param excludeScrollElementClass - Optional. A class name to exclude certain elements from triggering the close function on scroll.
 */
export function useCloseOnWindowChange(
  closeFunction: () => void,
  excludeScrollElementClass?: string
) {
  useEffect(() => {
    const handleCloseSelect = (event: Event) => {
      const target = event.target as HTMLElement
      if (
        excludeScrollElementClass &&
        target &&
        target.closest &&
        target.closest(excludeScrollElementClass)
      ) {
        return
      }
      closeFunction()
    }

    document.addEventListener("scroll", handleCloseSelect, true)
    window.addEventListener("resize", handleCloseSelect)
    return () => {
      document.removeEventListener("scroll", handleCloseSelect, true)
      window.removeEventListener("resize", handleCloseSelect)
    }
  }, [closeFunction, excludeScrollElementClass])
}
