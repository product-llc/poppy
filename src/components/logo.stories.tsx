import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./logo";

const meta: Meta<typeof Logo> = {
  component: Logo,
};
export default meta;

type Story = StoryObj<typeof Logo>;

export const White: Story = {
  args: {
    variant: "white",
  },
  decorators: [
    (Story) => (
      <div className="rounded bg-sidebar-bg p-4">
        <Story />
      </div>
    ),
  ],
};

export const Black: Story = {
  args: {
    variant: "black",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Logo width={24} height={24} variant="black" />
      <Logo width={40} height={40} variant="black" />
      <Logo width={64} height={64} variant="black" />
    </div>
  ),
};

export const Spin: Story = {
  args: {
    variant: "black",
    spin: true,
  },
};
