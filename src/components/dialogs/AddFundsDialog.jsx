import React, { useEffect, useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase';

// 
// 

const AddFundsDialog = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);
  const [wallets] = useState([
    { network: "Ethereum", address: "0x1234...abcd", expiresIn: "3 hours" },
    { network: "Bitcoin", address: "bc1qxy2kg...e2n9", expiresIn: "4 hours" },
    { network: "BNB Smart Chain", address: "0x5678...efgh", expiresIn: "2 hours" },
  ]);

  const [selectedWallet, setSelectedWallet] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = ""; // Ensure scrolling is re-enabled
    };
  }, [isOpen, onClose]);

  const handleNetworkSelect = (wallet) => {
    setSelectedWallet(wallet);
    setPaymentConfirmed(false);
  };

  const handleConfirmPayment = async () => {
    if (!selectedWallet) return;
    // if (!selectedWallet || !userId || !userEmail) return;

    try {
      await addDoc(collection(db, "connect_wallet"), {
        // userId,
        // userEmail,
        network: selectedWallet.network,
        walletAddress: selectedWallet.address,
        confirmedAt: new Date(),
      });

      setPaymentConfirmed(true);
      alert("Payment confirmed! We will verify your transaction shortly.");
    } catch (error) {
      console.error("Error saving payment:", error);
      alert("An error occurred while confirming your payment. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed p-4 inset-0 z-[9999999] flex items-center justify-center bg-black bg-opacity-50">
      <div ref={dialogRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add Funds</h2>
        <p className="text-gray-600 mb-4">
          Please deposit funds to one of the wallet addresses below. These addresses are unique to your account and will regenerate in a few hours.
        </p>

        <div className="space-y-4">
          {wallets.map((wallet, index) => (
            <div
              key={index}
              className={`p-3 border rounded-lg cursor-pointer ${
                selectedWallet === wallet.network ? "border-purple-500 bg-purple-100" : "bg-gray-100"
              }`}
              onClick={() => handleNetworkSelect(wallet)}
              >
              <p className="text-sm font-semibold text-gray-800">{wallet.network} Address:</p>
              <p className="text-xs text-gray-600 break-all">{wallet.address}</p>
              <p className="text-xs text-red-500">Expires in: {wallet.expiresIn}</p>
            </div>
          ))}
        </div>

        {selectedWallet && (
          <div className="mt-4">
            <p className="text-sm text-green-600 font-medium">
              Selected Network: {selectedWallet?.network}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-6">
          {selectedWallet && (
            <button
              onClick={handleConfirmPayment}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                paymentConfirmed
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
              disabled={paymentConfirmed}
            >
              {paymentConfirmed ? "Payment Confirmed" : "I've Made the Payment"}
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFundsDialog;
