// Системное
import clsx from "clsx"
import Image from "next/image"

// Типы и стили
import { IconProps } from "./types"

function Icon(props: IconProps) {
  const { type, className } = props
  if (type == "md") {
    let { name, size = 20 } = props
    let calculatedClassNames = clsx("material-symbols-rounded", className)
    return (
      <span className={calculatedClassNames} style={{ fontSize: size }}>
        {name.toLowerCase()}
      </span>
    )
  }
  if (type == "fa") {
    let { name, size, faType } = props
    let calculatedClassNames = clsx(
      className,
      "fa",
      "fa-" + name,
      !!faType && "fa-" + faType
    )
    return <i className={calculatedClassNames} style={{ fontSize: size }} />
  }
  if (type == "custom") {
    let { customIconLink, width, height, size = 20, alt } = props
    if (!width && !height) {
      width = height = size
    }
    if (!width) {
      width = height
    }
    if (!height) {
      height = width
    }
    return (
      <Image
        className={className}
        src={customIconLink}
        width={width}
        height={height}
        alt={alt}
      />
    )
  }
}

export default Icon
