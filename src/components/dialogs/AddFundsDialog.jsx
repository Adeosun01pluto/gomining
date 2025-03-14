import React, { useEffect, useRef } from 'react';

const AddFundsDialog = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = ''; // Ensure scrolling is re-enabled
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed p-4 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={dialogRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add Funds</h2>
        <p className="text-gray-600 mb-6">
          Add funds to your account to start using our services. Please enter the amount you wish to add.
        </p>
        <input
          type="number"
          placeholder="Enter amount"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Add Funds
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFundsDialog; 