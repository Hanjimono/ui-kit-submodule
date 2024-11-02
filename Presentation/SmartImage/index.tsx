// Styles and types
import { SmartImageProps } from "./types"
import { useMemo } from "react"

/**
 * A functional component that renders an image with a formatted source URL.
 * If the source URL starts with "/public", it removes this prefix.
 *
 * @param {SmartImageProps} props - The properties for the SmartImage component.
 * @param {string} props.src - The source URL of the image.
 * @param {string} [props.alt] - The alt text for the image. Defaults to "img" if not provided.
 *
 * @returns {JSX.Element} The rendered image element.
 */
function SmartImage({ src, alt, ...rest }: SmartImageProps) {
  let formattedSrc = useMemo(() => {
    let formattedSrc = src
    if (src.startsWith("/public")) {
      formattedSrc = src.replace("/public", "")
    }
    return formattedSrc
  }, [src])
  return <img src={formattedSrc} alt={alt || "img"} {...rest} />
}
export default SmartImage
