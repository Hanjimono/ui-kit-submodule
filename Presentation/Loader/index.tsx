// Системное
import clsx from "clsx"

// Типы и стили
import { LoaderProps } from "./types"
import { calculatedSizeSettings } from "./settings"
import styles from "./styles.module.scss"

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
