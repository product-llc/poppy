import type { Meta, StoryObj } from "@storybook/react";
import { AvatarMenu } from "./avatar-menu";

const meta: Meta<typeof AvatarMenu> = {
  component: AvatarMenu,
};
export default meta;

type Story = StoryObj<typeof AvatarMenu>;

export const WithAvatar: Story = {
  args: {
    avatarSrc: "/avatar.png",
  },
};

export const Placeholder: Story = {
  args: {
    avatarSrc: null,
  },
};
