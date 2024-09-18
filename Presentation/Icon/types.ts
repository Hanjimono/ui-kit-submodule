export interface IconStyledProps {
  size: number
}

export type IconType = "md" | "fa" | "custom"

type FaIconType = "lg" | "2x" | "3x" | "4x" | "5x" | "fw"

interface BaseIconProps {
  /** Тип иконки */
  type: IconType
  /** Размер иконки в px */
  size?: number
  /** Классы */
  className?: string
}

interface MDIconProps extends BaseIconProps {
  type: "md"
  /** Название иконки для Material icon @see https://fonts.google.com/icons,
   *  или для font-awesome @see https://fontawesome.com/icons */
  name: string
}

interface FAIconProps extends BaseIconProps {
  type: "fa"
  /** Название иконки для Material icon @see https://fonts.google.com/icons,
   *  или для font-awesome @see https://fontawesome.com/icons */
  name: string
  /** Подтип font-awesome иконки */
  faType?: FaIconType
}

interface CustomIconProps extends BaseIconProps {
  type: "custom"
  /** Ссылка на картинку, если нужно использовать сторонюю иконку */
  customIconLink: string
  /** alt для картинки */
  alt: string
  /** Ширина сторонней иконки в px */
  width?: number
  /** Высота сторонней иконки в px */
  height?: number
}

/**
 * Компонент реализующий все варианты иконок. Для material-icon и font-awesome нужно указывать name.
 * Для сторонней иконки нужно указывать ссылку на картинку и размер
 */
export type IconProps = MDIconProps | FAIconProps | CustomIconProps
