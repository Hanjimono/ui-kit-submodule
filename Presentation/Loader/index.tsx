// System
import { cva } from "class-variance-authority"
// Ui
import { smartCvaWrapper } from "@/ui/Skeleton/utils"
// Styles and types
import { LoaderProps } from "./types"

/**
 * Loader component that displays a loading spinner.
 *
 * @param {Object} props - The properties object.
 * @param {string | number} [props.size="sm"] - The size of the loader. Can be a string ("sm", "md", "lg") or a number (in pixels).
 *
 * @returns {JSX.Element} The Loader component.
 */
function Loader({ size = "sm" }: LoaderProps) {
  const calculatedClassnames = smartCvaWrapper(loaderStyles, {
    size: size
  })
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={calculatedClassnames}>
        <svg
          className="animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  )
}

const loaderStyles = cva("loader", {
  variants: {
    size: {
      xs: "w-4 h-4",
      sm: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-16 h-16",
      xl: "w-24 h-24",
      full: "w-full h-full"
    }
  }
})

export default Loader
