import type { Meta, StoryObj } from "@storybook/react"
import Menu, { MenuItem, MenuCategory } from "./index"

const meta: Meta<typeof Menu> = {
  title: "UI/Navigation/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Menu renders a navigation menu with optional nested categories and items. Supports active state and custom styling."
      }
    }
  },
  argTypes: {
    className: { control: "text" },
    items: { control: false },
    currentLink: { control: "text" },
    children: { control: false }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof Menu>

const demoItems = [
  { title: "Home", link: "/home" },
  { title: "Profile", link: "/profile" },
  { title: "Settings", link: "/settings" },
  {
    title: "Docs",
    items: [
      { title: "API", link: "/docs/api" },
      { title: "Guides", link: "/docs/guides" }
    ]
  }
]

export const Default: Story = {
  args: {
    items: demoItems,
    currentLink: "/home"
  }
}

export const WithActiveItem: Story = {
  args: {
    items: demoItems,
    currentLink: "/settings"
  }
}

export const WithCustomClass: Story = {
  args: {
    items: demoItems,
    currentLink: "/profile",
    className: "bg-blue-50 border-blue-400"
  }
}

export const CustomChildren: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuCategory
        title="Custom Category"
        items={[{ title: "Custom Link", link: "/custom" }]}
        currentLink="/custom"
      />
      <MenuItem title="Single Item" link="/single" currentLink="/single" />
    </Menu>
  ),
  args: {}
}
