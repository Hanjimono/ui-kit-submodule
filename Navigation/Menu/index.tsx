// system
import clsx from "clsx"
// ui
import Button from "@/ui/Actions/Button"
import Text from "@/ui/Presentation/Text"
// types and styles
import { MenuProps, MenuItemProps, MenuCategoryProps } from "./types"
import styles from "./styles.module.scss"

/** A colored block that displays a menu list */
function Menu({ children, className, items, currentLink }: MenuProps) {
  const url = window.location.pathname
  const calculatedClassNames = clsx(styles["menu"], className)
  if (!!items) {
    return (
      <div className={calculatedClassNames}>
        {items.map((item, idx) => {
          if ("items" in item) {
            return (
              <MenuCategory
                key={idx}
                currentLink={currentLink || url}
                {...item}
              />
            )
          }
          return (
            <MenuItem currentLink={currentLink || url} key={idx} {...item} />
          )
        })}
      </div>
    )
  }
  return <div className={calculatedClassNames}>{children}</div>
}

/** An individual menu item, which can function as a link or a button */
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

/** An individual menu category, which contain several menu items */
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
