import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Right: Story = {
  args: {
    content: "Tooltip content",
    side: "right",
    children: <button type="button">Hover me</button>,
  },
};

export const Bottom: Story = {
  args: {
    content: "Shows below",
    side: "bottom",
    children: <button type="button">Hover me</button>,
  },
};

export const Left: Story = {
  args: {
    content: "Shows on left",
    side: "left",
    children: <button type="button">Hover me</button>,
  },
};

export const Top: Story = {
  args: {
    content: "Shows above",
    side: "top",
    children: <button type="button">Hover me</button>,
  },
};
