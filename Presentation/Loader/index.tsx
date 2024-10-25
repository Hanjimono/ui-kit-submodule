// System
import clsx from "clsx"
// Styles and types
import { LoaderProps } from "./types"
import { calculatedSizeSettings } from "./settings"
import styles from "./styles.module.scss"

/**
 * Loader component that displays a loading spinner.
 *
 * @param {Object} props - The properties object.
 * @param {string | number} [props.size="sm"] - The size of the loader. Can be a string ("sm", "md", "lg") or a number (in pixels).
 * @param {number} [props.containerSize] - The size of the container. If not provided, it defaults to the size of the loader.
 * @param {boolean} [props.alternativeColor] - If true, applies an alternative color to the loader.
 *
 * @returns {JSX.Element} The Loader component.
 */
function Loader({ size = "sm", containerSize, alternativeColor }: LoaderProps) {
  const calculatedSize: string =
    typeof size === "number" ? size + "px" : calculatedSizeSettings[size]
  const calculatedContainerSize = !!containerSize
    ? containerSize + "px"
    : calculatedSize
  const calculatedClasses = clsx(
    styles["loader"],
    !!alternativeColor && styles["alternative-color"]
  )

  return (
    <div className={styles["loader-wrapper"]}>
      <div
        className={styles["loader-container"]}
        style={{
          width: calculatedContainerSize,
          height: calculatedContainerSize
        }}
      >
        <div
          className={calculatedClasses}
          style={{
            width: calculatedSize,
            height: calculatedSize
          }}
        ></div>
      </div>
    </div>
  )
}

export default Loader
