import React from "react";
import Button from "./Button";

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="success-modal" onClick={handleModalContentClick}>
        <button className="success-modal__close-btn" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="success-modal__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="success-modal__title">Congrats!</h1>
        <p className="success-modal__text">
          Your order is placed successfully!
        </p>

        <div className="success-modal__button-wrapper">
          <Button variant="primary" onClick={onClose}>
            Continue shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
