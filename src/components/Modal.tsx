// components/Modal.js
import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute right-4 top-[55%] sm:w-4/5 transform -translate-y-1/2  w-1/3 bg-white p-4 shadow-lg">
        {/* <button onClick={onClose} className="mb-4">
          Close
        </button> */}
        {children}
      </div>
    </div>
  );
}
