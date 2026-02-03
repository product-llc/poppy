"use client";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="aspect-video w-full max-w-3xl rounded-lg bg-white p-8 shadow-xl"
        style={{ maxHeight: "calc(100vh - 4rem)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="flex h-full items-center justify-center text-lg text-neutral-500">
          Search UI goes here
        </p>
      </div>
    </div>
  );
}
