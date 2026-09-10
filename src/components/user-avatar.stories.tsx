import type { Meta, StoryObj } from "@storybook/react";
import { UserAvatar } from "./user-avatar";

const meta: Meta<typeof UserAvatar> = {
  component: UserAvatar,
};
export default meta;

type Story = StoryObj<typeof UserAvatar>;

export const WithImage: Story = {
  args: {
    src: "/avatar.png",
  },
};

export const Placeholder: Story = {
  args: {
    src: null,
  },
};

export const NoStatus: Story = {
  args: {
    src: "/avatar.png",
    showStatus: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <UserAvatar size={24} src="/avatar.png" />
      <UserAvatar size={40} src="/avatar.png" />
      <UserAvatar size={64} src="/avatar.png" />
    </div>
  ),
};
