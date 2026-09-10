import type { Meta, StoryObj } from "@storybook/react";
import { HomeActionsGrid, type HomeAction } from "./home-actions-grid";

const meta: Meta<typeof HomeActionsGrid> = {
  component: HomeActionsGrid,
};
export default meta;

type Story = StoryObj<typeof HomeActionsGrid>;

const sampleActions: HomeAction[] = [
  { label: "Ask about a document", iconKey: "book" },
  { label: "Email a summary", iconKey: "at" },
  { label: "Continue last chat", iconKey: "messages" },
  { label: "Create a task list", iconKey: "checkDouble" },
  { label: "Generate an image", iconKey: "shapes" },
  { label: "Schedule a reminder", iconKey: "snooze" },
];

export const Default: Story = {
  args: {
    actions: sampleActions,
  },
};

export const FewActions: Story = {
  args: {
    actions: sampleActions.slice(0, 3),
  },
};
