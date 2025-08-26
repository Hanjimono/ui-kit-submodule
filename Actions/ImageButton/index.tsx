// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"
import Link from "next/link"
// Ui
import SmartImage from "@/ui/Presentation/SmartImage"
import Title from "@/ui/Presentation/Title"
import Text from "@/ui/Presentation/Text"
// Styles and types
import { ImageButtonProps } from "./types"

/**
 * Renders an interactive image button with optional title and description overlays.
 *
 * @param className - Additional CSS classes to apply to the button container.
 * @param link - Optional URL to wrap the button in a link.
 * @param onClick - Optional click handler for the button.
 * @param title - Optional title text to display over the image.
 * @param description - Optional description text to display over the image.
 * @param isWithoutSaturationChange - If true, disables the saturation hover effect.
 * @param isWithoutTextBackground - If true, hides the blurred background behind the text overlay.
 * @param rest - Additional props passed to the underlying `SmartImage` component.
 */
function ImageButton({
  className,
  link,
  onClick,
  title,
  description,
  isWithoutSaturationChange,
  isWithoutTextBackground,
  ...rest
}: ImageButtonProps) {
  const calculatedClassNames = cx(
    twMerge(
      "image-button flex flex-col items-center justify-center rounded-lg overflow-hidden cursor-pointer shadow-lg relative",
      !isWithoutSaturationChange && "saturate-70 hover:saturate-100",
      className
    )
  )
  const handleClick = (e: React.BaseSyntheticEvent) => {
    if (onClick) {
      e.stopPropagation()
      onClick(e)
    }
  }
  return (
    <ConditionalWrapper link={link}>
      <motion.div
        className={calculatedClassNames}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={handleClick}
      >
        <SmartImage {...rest} />
        {!isWithoutTextBackground && (title || description) && (
          <TextContainer
            className="absolute bottom-[10%] left-[10%] blur-lg bg-gray-900/60"
            title={title}
            description={description}
          />
        )}
        {(title || description) && (
          <TextContainer
            className="absolute bottom-[10%] left-[10%]"
            title={title}
            description={description}
          />
        )}
      </motion.div>
    </ConditionalWrapper>
  )
}

/**
 * Renders a container displaying an optional title and description with customizable styling.
 *
 * @param props.title - Optional title text to display at the top.
 * @param props.description - Optional description text to display below the title.
 * @param props.className - Optional additional class names for custom styling.
 */
function TextContainer({
  title,
  description,
  className
}: {
  title?: string
  description?: string
  className?: string
}) {
  const calculatedClassNames = cx(twMerge("p-1 rounded-lg", className))
  return (
    <div className={calculatedClassNames}>
      {title && <Title size={4}>{title}</Title>}
      {description && (
        <Text className="text-gray-200" size="small">
          {description}
        </Text>
      )}
    </div>
  )
}

/**
 * Conditionally wraps its children with a Next.js `Link` component if a `link` prop is provided.
 *
 * @param link - Optional URL to wrap the children with a `Link`. If not provided, children are rendered as-is.
 */
function ConditionalWrapper({
  link,
  children
}: {
  link?: string
  children: React.ReactNode
}) {
  if (!!link) return <Link href={link}>{children}</Link>
  return <>{children}</>
}

export default ImageButton
