import type { Meta, StoryObj } from "@storybook/react";
import { FaIcon } from "./fa-icon";
import { faHouse, faBell, faUser } from "@fortawesome/pro-solid-svg-icons";

const meta: Meta<typeof FaIcon> = {
  component: FaIcon,
};
export default meta;

type Story = StoryObj<typeof FaIcon>;

export const Default: Story = {
  args: {
    icon: faHouse,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <FaIcon icon={faBell} size="xs" />
      <FaIcon icon={faBell} size="sm" />
      <FaIcon icon={faBell} size="lg" />
      <FaIcon icon={faBell} size="xl" />
      <FaIcon icon={faBell} size="2x" />
    </div>
  ),
};

export const WithClassName: Story = {
  args: {
    icon: faUser,
    className: "text-green-600",
  },
};
