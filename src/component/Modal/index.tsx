"use client";

import React from "react";
import ReactDOM from "react-dom";
import Header from "../Header";
import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

const Modal = ({ children, isOpen, onClose, name }: Props) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="dark:bg-dark-bg-2 relative w-full max-w-2xl rounded-lg bg-white text-gray-900 shadow-xl dark:text-gray-100">
        {/* Header */}
        <div className="dark:border-stroke-dark border-b border-gray-200 px-4 py-3">
          <Header
            name={name}
            buttonComponent={
              <button
                className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={onClose}
              >
                <X size={16} />
              </button>
            }
            isSmalltext
          />
        </div>

        {/* Body */}
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
