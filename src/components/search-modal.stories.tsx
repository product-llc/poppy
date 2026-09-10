import type { Meta, StoryObj } from "@storybook/react";
import { SearchModal } from "./search-modal";
import { useState } from "react";

const meta: Meta<typeof SearchModal> = {
  component: SearchModal,
};
export default meta;

type Story = StoryObj<typeof SearchModal>;

function SearchModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open modal
      </button>
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

export const Interactive: Story = {
  render: () => <SearchModalWrapper />,
};
