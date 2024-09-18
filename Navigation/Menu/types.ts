/** Represents an individual menu item */
interface MenuElement {
  /** The actual title that will be displayed on the screen */
  title: string
  /** The URL to which the menu item links (optional) */
  link?: string
  /** A custom function to be executed when the menu item is clicked (optional) */
  onClick?: () => void
  /** The current location used to determine if the item is active (optional) */
  currentLink?: string
  /** Flag indicating whether the menu item is active (optional) */
  isActive?: boolean
}

/** Represents a category in the menu containing multiple items */
interface MenuCategory {
  /** The title of the menu category */
  title: string
  /** The current location used to determine if the item inside items array is active (optional) */
  currentLink?: string
  /** The list of menu items within this category */
  items: MenuElement[]
}

/** Properties for a colored block that displays a menu list */
export interface MenuProps {
  /** React children components */
  children?: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** The list of menu categories or individual menu items */
  items?: MenuCategory[] | MenuElement[]
  /** The current location used to determine which item inside items array is active (optional) */
  currentLink?: string
}

/** Properties for an individual menu item, which can function as a link or a button */
export interface MenuItemProps extends MenuElement {
  /** React children components */
  children?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

/** Properties for an individual menu category, which contain several menu items */
export interface MenuCategoryProps extends MenuCategory {
  /** React children components */
  children?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}
