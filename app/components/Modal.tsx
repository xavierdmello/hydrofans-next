import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: number | null;
  intake: number | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, day, intake }) => {
  if (!isOpen || day === null || intake === null) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Water Intake Details</h2>
        <p>Day: {day}</p>
        <p>Intake: {intake} mL</p>
        <p>Cups: {(intake / 240).toFixed(2)}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
