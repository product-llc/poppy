import type { Meta, StoryObj } from "@storybook/react";
import { SidebarNavItem } from "./sidebar-nav-item";
import { faHouse } from "@fortawesome/pro-solid-svg-icons";
import { faHouse as faHouseRegular } from "@fortawesome/pro-regular-svg-icons";

const meta: Meta<typeof SidebarNavItem> = {
  component: SidebarNavItem,
  decorators: [
    (Story) => (
      <div className="rounded bg-sidebar-bg p-4">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SidebarNavItem>;

export const Inactive: Story = {
  args: {
    iconRegular: faHouseRegular,
    iconSolid: faHouse,
    label: "Home",
    active: false,
    href: "#",
  },
};

export const Active: Story = {
  args: {
    iconRegular: faHouseRegular,
    iconSolid: faHouse,
    label: "Home",
    active: true,
    href: "#",
  },
};

export const WithOnClick: Story = {
  args: {
    iconRegular: faHouseRegular,
    iconSolid: faHouse,
    label: "Home",
    active: false,
    onClick: () => alert("Clicked"),
  },
};
