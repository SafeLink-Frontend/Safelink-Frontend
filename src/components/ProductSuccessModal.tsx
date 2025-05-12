// SuccessModal.tsx
import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAnother: () => void;
  onProceed: () => void;
}

const ProductSuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  onAddAnother,
  onProceed,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Success!</h2>
        <p className="mb-4">Your product has been listed successfully.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onAddAnother}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Another
          </button>
          <button
            onClick={onProceed}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSuccessModal;
