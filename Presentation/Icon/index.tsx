// Ui
import { formatClassnames } from "@/ui/Skeleton/utils"
// Types and styles
import { CustomIconProps, IconProps } from "./types"
import SmartImage from "../SmartImage"
import { useState } from "react"

/**
 * Icon component that renders different types of icons based on the `type` prop.
 *
 * @param {IconProps} props - The properties for the Icon component.
 * @param {string} props.type - The type of the icon. Can be "md" for Material Design icons, "fa" for FontAwesome icons, or "custom" for custom icons.
 * @param {string} [props.className] - Additional class names to apply to the icon.
 *
 * For Material Design icons:
 * @param {string} props.name - The name of the Material Design icon.
 * @param {number} [props.size=20] - The size of the Material Design icon.
 *
 * For FontAwesome icons:
 * @param {string} props.name - The name of the FontAwesome icon.
 * @param {number} [props.size] - The size of the FontAwesome icon.
 * @param {string} [props.faType] - The FontAwesome icon type (e.g., "solid", "regular").
 *
 * For custom icons:
 * @param {string} props.customIconLink - The URL of the custom icon.
 * @param {number} [props.width] - The width of the custom icon. Defaults to `size` if not provided.
 * @param {number} [props.height] - The height of the custom icon. Defaults to `size` if not provided.
 * @param {number} [props.size=20] - The size of the custom icon if width and height are not provided.
 * @param {string} [props.alt] - The alt text for the custom icon.
 *
 * @returns {JSX.Element} The rendered icon component.
 */
function Icon(props: IconProps) {
  const { type, className } = props
  if (type == "md") {
    let { name, size = 20 } = props
    let calculatedClassNames = formatClassnames("font-icon", className)
    return (
      <span className={calculatedClassNames} style={{ fontSize: `${size}px` }}>
        {name.toLowerCase()}
      </span>
    )
  }
  if (type == "fa") {
    let { name, size, faType } = props
    let calculatedClassNames = formatClassnames("fa", "fa-" + name, className)
    return <i className={calculatedClassNames} />
  }
  if (type == "custom") {
    return <CustomIcon {...(props as CustomIconProps)} />
  }
}

function CustomIcon({
  customIconLink,
  hoverIconLink,
  width,
  height,
  size,
  alt,
  className
}: CustomIconProps) {
  const [isHover, setIsHover] = useState(false)
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
    <SmartImage
      className={formatClassnames("custom-icon", className)}
      src={hoverIconLink && isHover ? hoverIconLink : customIconLink}
      width={width}
      height={height}
      alt={alt}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    />
  )
}

export default Icon
