// system
import clsx from "clsx"
import { usePathname } from "next/navigation"
// ui
import Button from "@/ui/Actions/Button"
import Text from "@/ui/Presentation/Text"
// types and styles
import { MenuProps, MenuItemProps, MenuCategoryProps } from "./types"
import styles from "./styles.module.scss"

/**
 * Menu component renders a navigation menu with optional nested categories and items.
 *
 * @param {MenuProps} props - The properties for the Menu component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the menu.
 * @param {string} [props.className] - Additional class names to apply to the menu container.
 * @param {Array<MenuItem | MenuCategory>} [props.items] - The list of menu items or categories to be rendered.
 * @param {string} [props.currentLink] - The current active link, defaults to the current window location pathname.
 *
 * @returns {JSX.Element} The rendered Menu component.
 */
function Menu({ children, className, items, currentLink }: MenuProps) {
  const url = usePathname()
  const sanitizedUrl = url.endsWith("/") ? url.slice(0, -1) : url;
  const calculatedClassNames = clsx(styles["menu"], className)
  if (!!items) {
    return (
      <div className={calculatedClassNames}>
        {items.map((item, idx) => {
          if ("items" in item) {
            return (
              <MenuCategory
                key={idx}
                currentLink={currentLink || sanitizedUrl}
                {...item}
              />
            )
          }
          return (
            <MenuItem currentLink={currentLink || sanitizedUrl} key={idx} {...item} />
          )
        })}
      </div>
    )
  }
  return <div className={calculatedClassNames}>{children}</div>
}

/**
 * An individual menu item, which can function as a link or a button.
 *
 * @param {React.ReactNode} children - The child elements to be rendered inside the menu item.
 * @param {string} title - The title text to be displayed for the menu item.
 * @param {string} [className] - Additional class names to apply to the menu item.
 * @param {boolean} [isActive] - Determines if the menu item is active. If undefined, it will be determined based on the current link.
 * @param {string} currentLink - The current link to compare with the menu item's link to determine if it is active.
 * @param {string} link - The link associated with the menu item.
 * @param {object} rest - Additional props to be passed to the Button component.
 *
 * @returns {JSX.Element} The rendered menu item component.
 */
export function MenuItem({
  children,
  title,
  className,
  isActive,
  currentLink,
  link,
  ...rest
}: MenuItemProps) {
  const calculatedClassNames = clsx(
    styles["menu-item"],
    (isActive === undefined ? currentLink == link && !!link : isActive) &&
      styles["active"],
    className
  )
  return (
    <Button className={calculatedClassNames} text {...rest} wide link={link}>
      <Text type="fit-line">{title}</Text>
      {children}
    </Button>
  )
}

/**
 * MenuCategory component renders a category of menu items with a title.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.className - Additional class names to apply to the component.
 * @param {string} props.title - The title of the menu category.
 * @param {Array} props.items - An array of menu items to be rendered.
 * @param {string} props.currentLink - The current active link in the menu.
 * @param {React.ReactNode} props.children - Additional child elements to be rendered within the menu category.
 *
 * @returns {JSX.Element} The rendered MenuCategory component.
 */
export function MenuCategory({
  className,
  title,
  items,
  currentLink,
  children
}: MenuCategoryProps) {
  const calculatedClassNames = clsx(styles["menu-category"], className)
  return (
    <div className={calculatedClassNames}>
      <Text className={styles["menu-category-title"]} type="fit-line">
        {title}
      </Text>
      <div className={styles["menu-category-items"]}>
        {items &&
          items.length > 0 &&
          items.map((menuItem, key) => (
            <MenuItem
              {...menuItem}
              currentLink={menuItem.currentLink || currentLink}
              key={key}
            />
          ))}
        {children}
      </div>
    </div>
  )
}

export default Menu
