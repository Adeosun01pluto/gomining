import React, { useState, useEffect } from "react";
import { FaBitcoin, FaWallet, FaChartLine, FaHammer, FaCog, FaPlus, FaUser, FaPencilAlt, FaQuestionCircle, FaSignOutAlt, FaBell, FaGlobe, FaShieldAlt, FaKey, FaMicrochip } from "react-icons/fa";
import { AiOutlineTransaction, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsGraphUp, BsLightning } from "react-icons/bs";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { getAuth, signOut } from 'firebase/auth';
import NotFound from './NotFound';
import MinerCreationDialog from '../components/dialogs/MinerCreationDialog';
import WalletConnectionDialog from '../components/dialogs/WalletConnectionDialog';
import AddFundsDialog from '../components/dialogs/AddFundsDialog';
import { Circles } from "react-loader-spinner";

// Dashboard Components
const MainDashboard = () => {
  const [hasData] = useState(false); // Temporary state for demo, replace with actual data check
  const [showMinerCreation, setShowMinerCreation] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false); // New state for Add Funds dialog

  if (!hasData) {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 md:pt-0">
        <div className="bg-white rounded-xl p-4 sm:px-6 md:px-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left font-semibold">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              Watch your miner's performance
              </h2>
              <p className="md:w-full w-[80%] mx-auto text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Keep track of your miner metrics and upgrade them to earn even more BTC every day.
              </p>
              <div className="flex md:justify-start justify-center items-center gap-4 bg-gray-50 rounded-xl md:p-2 p-4">
                <span className="bg-green-500 p-3 rounded-full md:ml-2">
                    <BsLightning className=" text-white text-2xl md:text-4xl" />
                </span>
                <div>
                  <h3 className="text-sm md:text-xl font-semibold text-gray-800 flex items-center">
                  Power of purchased digital miners
                  </h3>
                  <p className="text-md sm:text-lg md:text-3xl font-bold text-purple-600">7,201,059 TH</p>
                </div>
              </div>
            </div>
            <img
              src="https://app.gomining.com/assets/images/nft/stub/power.png"
              alt="Power of Miners"
              className="w-full sm:w-1/2 rounded-lg"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-3 font-semibold">
            <button 
              onClick={() => setShowMinerCreation(true)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 text-white text-sm sm:text-base rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FaPlus className="text-sm" />
              <span>Create miner</span>
            </button>
            <button 
              onClick={() => setShowAddFunds(true)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-purple-600 text-purple-600 text-sm sm:text-base rounded-lg hover:bg-purple-50 transition-colors w-full sm:w-auto"
            >
              Add funds
            </button>
          </div>
        </div>
        <div className="h-[60%]">
          <MinerCreationDialog 
            isOpen={showMinerCreation} 
            onClose={() => setShowMinerCreation(false)} 
          />
          <AddFundsDialog 
            isOpen={showAddFunds} 
            onClose={() => setShowAddFunds(false)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 md:pt-0">
      {/* Header */}
      <header className="md:hidden flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Welcome to Dashboard</h2>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-auto pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <Link to="/dashboard/profile" className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors">
            <FaCog />
          </Link>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-3 sm:p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold">Total Balance</h3>
            <FaBitcoin className="text-lg sm:text-xl md:text-2xl opacity-80" />
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 sm:mt-3 md:mt-4 break-words">4,043.5599 BTC</p>
          <p className="text-xs md:text-sm opacity-80 mt-1 sm:mt-2">≈ $134,510.15 USD</p>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Mining Power</h3>
            <BsLightning className="text-lg sm:text-xl md:text-2xl text-yellow-500" />
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 sm:mt-3 md:mt-4 text-gray-800 break-words">127,402 TH/s</p>
          <p className="text-xs md:text-sm text-gray-500 mt-1 sm:mt-2">+2.5% from last week</p>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Active Miners</h3>
            <FaHammer className="text-lg sm:text-xl md:text-2xl text-gray-600" />
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 sm:mt-3 md:mt-4 text-gray-800">24</p>
          <p className="text-xs md:text-sm text-gray-500 mt-1 sm:mt-2">3 pending activation</p>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Daily Rewards</h3>
            <FaChartLine className="text-lg sm:text-xl md:text-2xl text-green-500" />
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 sm:mt-3 md:mt-4 text-gray-800 break-words">0.0234 BTC</p>
          <p className="text-xs md:text-sm text-gray-500 mt-1 sm:mt-2">≈ $780.45 USD</p>
        </div>
      </div>

      {/* Mining Farm Section */}
      <section className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">Mining Farm</h2>
          <button className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-purple-600 text-white text-sm sm:text-base rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto">
            <FaPlus className="text-sm" />
            <span>Create Miner</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {[1, 2, 3].map((miner) => (
            <div key={miner} className="bg-gray-50 rounded-xl p-3 sm:p-4 md:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800">Miner #{miner}</h3>
                <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-600">Active</span>
              </div>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600">Power:</span>
                  <span className="font-medium">42.5 TH/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily Reward:</span>
                  <span className="font-medium">0.0078 BTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-500">Mining</span>
                </div>
              </div>
              <button className="w-full mt-3 sm:mt-4 py-2 bg-gray-800 text-white text-xs sm:text-sm md:text-base rounded-lg hover:bg-gray-900 transition-colors">
                Manage
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6">Recent Transactions</h2>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-[600px] md:w-full">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600 border-b text-sm md:text-base">
                  <th className="pb-4 px-4 md:px-0">Type</th>
                  <th className="pb-4 px-4 md:px-0">Amount</th>
                  <th className="pb-4 px-4 md:px-0">Status</th>
                  <th className="pb-4 px-4 md:px-0">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm md:text-base">
                {[1, 2, 3].map((tx) => (
                  <tr key={tx} className="text-gray-800">
                    <td className="py-4 px-4 md:px-0">Mining Reward</td>
                    <td className="py-4 px-4 md:px-0 font-medium">+0.0023 BTC</td>
                    <td className="py-4 px-4 md:px-0">
                      <span className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm bg-green-100 text-green-600">
                        Completed
                      </span>
                    </td>
                    <td className="py-4 px-4 md:px-0 text-gray-500">2024-03-19 14:30</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

const Wallet = () => {
  const [hasBalance] = useState(false); // Temporary state for demo
  const [showWalletConnection, setShowWalletConnection] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false); // New state for Add Funds dialog

  if (!hasBalance) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
        <div className="max-w-4xl mx-auto text-center py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left font-semibold">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Connect your wallet
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Link your Bitcoin wallet to start receiving mining rewards directly and securely.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2">Wallet Balance</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">0.00000000 BTC</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">≈ $0.00 USD</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button 
                  onClick={() => setShowWalletConnection(true)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 text-white text-sm sm:text-base rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto"
                >
                  Connect wallet
                </button>
                <button 
                  onClick={() => setShowAddFunds(true)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 border border-purple-600 text-purple-600 text-sm sm:text-base rounded-lg hover:bg-purple-50 transition-colors w-full sm:w-auto"
                >
                  Add funds
                </button>
              </div>
            </div>
            <img
              src="https://app.gomining.com/assets/images/nft/stub/sales.png"
              alt="Wallet"
              className="w-full sm:w-1/2 rounded-lg"
            />
          </div>
        </div>

        <WalletConnectionDialog 
          isOpen={showWalletConnection} 
          onClose={() => setShowWalletConnection(false)} 
        />
        <AddFundsDialog 
          isOpen={showAddFunds} 
          onClose={() => setShowAddFunds(false)} 
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Wallet</h2>
      {/* Wallet content here */}
    </div>
  );
};


// Profile Component
const Profile = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto md:pt-0">
      {/* Profile Header */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-medium">
                {user && (user.displayName 
                  ? user.displayName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 3)
                  : user.email.slice(0, 3).toUpperCase()
                )}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-gray-800 break-all ">{user?.displayName || user?.email}</h2>
                <span className="text-sm text-gray-500 break-all ">
                  {user?.emailVerified ? '(Verified)' : '(Not Verified)'}
                </span>
              </div>
              <p className="text-gray-600 break-all ">Email: {user?.email}</p>
              <p className="text-gray-600 break-all ">User ID: {user?.uid}</p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <FaPencilAlt className="text-gray-600" />
          </button>
        </div>
      </section>

      {/* Promos Section */}
      <section className="bg-white rounded-xl shadow-sm overflow-hidden">
        <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
          <span className="font-semibold text-gray-800">Promos</span>
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Security Settings */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          <h3 className="px-6 py-4 font-semibold text-gray-800 border-b">Security</h3>
          <div className="divide-y">
            <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FaKey className="text-gray-400" />
                <span className="text-gray-800">Set password</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FaShieldAlt className="text-gray-400" />
                <span className="text-gray-800">KYC</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Not Verified</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FaKey className="text-gray-400" />
                <span className="text-gray-800">2FA</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Disabled</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </section>

        {/* Personalization Settings */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          <h3 className="px-6 py-4 font-semibold text-gray-800 border-b">Personalization</h3>
          <div className="divide-y">
            <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FaBitcoin className="text-gray-400" />
                <span className="text-gray-800">Reward settings</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FaBell className="text-gray-400" />
                <span className="text-gray-800">Notifications</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FaGlobe className="text-gray-400" />
                <span className="text-gray-800">Language</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">English</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </section>

        {/* Support Section */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          <h3 className="px-6 py-4 font-semibold text-gray-800 border-b">Support</h3>
          <div className="divide-y">
            <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FaQuestionCircle className="text-gray-400" />
                <span className="text-gray-800">FAQ</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FaQuestionCircle className="text-gray-400" />
                <span className="text-gray-800">Support</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* Logout Button */}
        <button className="w-full px-6 py-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center space-x-2">
          <FaSignOutAlt />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

// Components
const Miners = ({ showMinerCreation, setShowMinerCreation }) => {
  const [hasMiners] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false); // New state for Add Funds dialog

  if (!hasMiners) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
        <div className="max-w-4xl mx-auto text-center py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left font-semibold">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Build your mining farm
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Gather your miners into a powerful collection and boost their performance to maximize your rewards.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2">Mining Farms</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">0 miners</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button 
                  onClick={() => setShowMinerCreation(true)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 text-white text-sm sm:text-base rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <FaPlus className="text-sm" />
                  <span>Create miner</span>
                </button>
                <button 
                  onClick={() => setShowAddFunds(true)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 border border-purple-600 text-purple-600 text-sm sm:text-base rounded-lg hover:bg-purple-50 transition-colors w-full sm:w-auto"
                >
                  Add funds
                </button>
              </div>
            </div>
            <img
              src="https://app.gomining.com/assets/images/nft/stub/farm.png"
              alt="Mining Farm"
              className="w-full sm:w-1/2 rounded-lg"
            />
          </div>
        </div>
        <AddFundsDialog 
          isOpen={showAddFunds} 
          onClose={() => setShowAddFunds(false)} 
        />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Miners</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6].map((miner) => (
          <div key={miner} className="bg-gray-50 rounded-xl p-3 sm:p-4 md:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800">Miner #{miner}</h3>
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-600">Active</span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Power:</span>
                <span className="font-medium">42.5 TH/s</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Daily Reward:</span>
                <span className="font-medium">0.0078 BTC</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-500">Mining</span>
              </div>
            </div>
            <button className="w-full mt-3 sm:mt-4 py-2 bg-gray-800 text-white text-xs sm:text-sm rounded-lg hover:bg-gray-900 transition-colors">
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const MiningFarm = ({ showMinerCreation, setShowMinerCreation }) => {
  const [hasFarms] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false); // New state for Add Funds dialog

  if (!hasFarms) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
        <div className="max-w-4xl mx-auto text-center py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left font-semibold">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Build your mining farm
              </h2>
              <p className="md:w-full w-[80%] mx-auto text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Gather your miners into a powerful collection and boost their performance to maximize your rewards.
              </p>
              <div className="flex md:justify-start justify-center items-center gap-4 bg-gray-50 rounded-xl md:p-2 p-4">
                <span className="ml-2">
                    <FaMicrochip className="text-gray-600 text-4xl" />
                </span>
                <div>
                  <h3 className="text-base sm:text-md md:text-xl font-semibold text-gray-800 flex items-center">
                    Mining farms
                  </h3>
                  <p className="text-md sm:text-lg md:text-3xl font-bold text-purple-600">129,023</p>
                </div>
              </div>
            </div>
            <img
              src="https://app.gomining.com/assets/images/nft/stub/farm.png"
              alt="Mining Farm"
              className="w-full sm:w-1/2 rounded-lg"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 font-semibold">
            <button 
              onClick={() => setShowMinerCreation(true)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 text-white text-sm sm:text-base rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FaPlus className="text-sm" />
              <span>Create farm</span>
            </button>
            <button 
              onClick={() => setShowAddFunds(true)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-purple-600 text-purple-600 text-sm sm:text-base rounded-lg hover:bg-purple-50 transition-colors w-full sm:w-auto"
            >
              Add funds
            </button>
          </div>
        </div>
        <AddFundsDialog 
          isOpen={showAddFunds} 
          onClose={() => setShowAddFunds(false)} 
        />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Mining Farm</h2>
        <button 
          onClick={() => setShowMinerCreation(true)}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 text-white text-sm sm:text-base rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <FaPlus className="text-sm" />
          <span>Create Miner</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {[1, 2, 3].map((farm) => (
          <div key={farm} className="bg-gray-50 rounded-xl p-3 sm:p-4 md:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800">Farm #{farm}</h3>
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-600">Active</span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Total Power:</span>
                <span className="font-medium">127.5 TH/s</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Active Miners:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Daily Rewards:</span>
                <span className="font-medium">0.0234 BTC</span>
              </div>
            </div>
            <button className="w-full mt-3 sm:mt-4 py-2 bg-gray-800 text-white text-xs sm:text-sm rounded-lg hover:bg-gray-900 transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Rewards = ({ showMinerCreation, setShowMinerCreation }) => {
  const [hasRewards] = useState(false);
  const [showWalletConnection, setShowWalletConnection] = useState(false); // New state for Wallet Connection dialog

  if (!hasRewards) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
        <div className="max-w-4xl mx-auto text-center py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left font-semibold">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              Earn daily BTC rewards
              </h2>
              <p className="md:w-full w-[80%] mx-auto text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Connect your BTC wallet in seconds and get a lifetime of rewards to it. Receive your BTC securely with zero fees.
              </p>
              <div className="flex md:justify-start justify-center items-center gap-4 bg-gray-50 rounded-xl md:p-2 p-4">
                <span className="bg-orange-500 p-2 rounded-full md:ml-2">
                    <FaBitcoin className=" text-white text-2xl md:text-4xl" />
                </span>
                <div>
                  <h3 className="text-md md:text-md font-semibold text-gray-800 flex items-center">
                  Earned by digital miner holders
                  </h3>
                  <p className="text-lg md:text-xl font-bold text-purple-600">4,062.67288541 BTC</p>
                </div>
              </div>
            </div>
            <img
              src="https://app.gomining.com/assets/images/nft/stub/rewards.png"
              alt="Rewards"
              className="w-full sm:w-1/2 rounded-lg"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 font-semibold">
            <button 
              onClick={() => setShowMinerCreation(true)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 text-white text-sm sm:text-base rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FaPlus className="text-sm" />
              <span>Create miner</span>
            </button>
            <button 
              onClick={() => setShowWalletConnection(true)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-purple-600 text-purple-600 text-sm sm:text-base rounded-lg hover:bg-purple-50 transition-colors w-full sm:w-auto"
            >
              Connect wallet
            </button>
          </div>
        </div>
        <WalletConnectionDialog 
          isOpen={showWalletConnection} 
          onClose={() => setShowWalletConnection(false)} 
        />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Mining Rewards</h2>
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-3 sm:p-4 md:p-6 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold">Total Rewards</h3>
              <FaBitcoin className="text-lg sm:text-xl md:text-2xl opacity-80" />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 sm:mt-3 md:mt-4">4.5599 BTC</p>
            <p className="text-xs sm:text-sm opacity-80 mt-1 sm:mt-2">≈ $134,510.15 USD</p>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Daily Average</h3>
              <FaChartLine className="text-lg sm:text-xl md:text-2xl text-green-500" />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 sm:mt-3 md:mt-4 text-gray-800">0.0234 BTC</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">≈ $780.45 USD</p>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Monthly Estimate</h3>
              <BsLightning className="text-lg sm:text-xl md:text-2xl text-yellow-500" />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 sm:mt-3 md:mt-4 text-gray-800">0.702 BTC</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">≈ $23,413.50 USD</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-3 sm:p-4 md:p-6 border-b border-gray-100">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">Recent Rewards</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="p-3 sm:p-4 md:p-6 text-xs sm:text-sm">Date</th>
                  <th className="p-3 sm:p-4 md:p-6 text-xs sm:text-sm">Amount</th>
                  <th className="p-3 sm:p-4 md:p-6 text-xs sm:text-sm">Type</th>
                  <th className="p-3 sm:p-4 md:p-6 text-xs sm:text-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[1, 2, 3, 4, 5].map((reward) => (
                  <tr key={reward} className="text-gray-800">
                    <td className="p-3 sm:p-4 md:p-6 text-xs sm:text-sm">2024-03-19 14:30</td>
                    <td className="p-3 sm:p-4 md:p-6 text-xs sm:text-sm font-medium">+0.0023 BTC</td>
                    <td className="p-3 sm:p-4 md:p-6 text-xs sm:text-sm">Mining Reward</td>
                    <td className="p-3 sm:p-4 md:p-6">
                      <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-600">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(null);
  const [showMinerCreation, setShowMinerCreation] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getUserInitials = () => {
    if (!user) return '';
    if (user.displayName) {
      return user.displayName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 3);
    }
    return user.email.slice(0, 3).toUpperCase();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu') && !event.target.closest('.mobile-menu')) {
        setShowUserMenu(false);
        setIsMenuOpen(false);
      }
      if (!event.target.closest('.notifications-menu')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    // Handle navigation and close menu
  const handleNavigation = (path) => {
    console.log("Navigating to:", path); // Debugging log
    console.log("isMenuOpen:", isMenuOpen);
    setIsMenuOpen(false);
    navigate(path);
    // setTimeout(() => {
    // }, 200); // Ensure menu closes first
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
        <Circles
          height="80"
          width="80"
          color="#a855f7 "
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          />
        {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div> */}
      </div>
    )
  }``


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      
      <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-[1000]">
        <div className="max-w-[2000px] mx-auto">
          {/* Main Navigation */}
          <div className="flex items-center justify-between px-4 h-16">
            {/* Desktop Navigation - Left */}
            <div className="flex-1 flex items-center justify-start">
              {/* GoMining Logo */}
              <div className="flex items-center">
                <Link to="/dashboard"className="flex items-center">
                  {/* <div className="w-8 h-8 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/50"></div>
                  <h1 className="text-xl md:text-2xl font-bold text-purple-600 whitespace-nowrap">GoMining</h1> */}
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/GoMining_Logo_%28Black%29.png" alt="" className="w-48 scale-110 h-16 object-contain ml-[-20px]"/>
                </Link>
                <div className="hidden md:flex text-sm items-center">
                  <Link
                    to="/dashboard"
                    className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                      isActive('/dashboard')
                        ? 'bg-purple-50 text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FaBitcoin className={isActive('/dashboard') ? 'text-purple-600' : 'text-gray-400'} />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    to="/dashboard/wallet"
                    className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                      isActive('/dashboard/wallet')
                        ? 'bg-purple-50 text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FaWallet className={isActive('/dashboard/wallet') ? 'text-purple-600' : 'text-gray-400'} />
                    <span>Wallet</span>
                  </Link>

                  <Link
                    to="/dashboard/miners"
                    className={`hidden md:flex px-4 py-2 rounded-lg transition-all items-center space-x-2 ${
                      isActive('/dashboard/miners')
                        ? 'bg-purple-50 text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FaHammer className={isActive('/dashboard/miners') ? 'text-purple-600' : 'text-gray-400'} />
                    <span>Miners</span>
                  </Link>

                  <Link
                    to="/dashboard/mining-farm"
                    className={`hidden md:flex px-4 py-2 rounded-lg transition-all items-center space-x-2 ${
                      isActive('/dashboard/mining-farm')
                        ? 'bg-purple-50 text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FaChartLine className={isActive('/dashboard/mining-farm') ? 'text-purple-600' : 'text-gray-400'} />
                    <span>Mining</span> <span className="lg:flex hidden">Farm</span>
                  </Link>

                  <Link
                    to="/dashboard/rewards"
                    className={`hidden md:flex px-4 py-2 rounded-lg transition-all items-center space-x-2 ${
                      isActive('/dashboard/rewards')
                        ? 'bg-purple-50 text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <BsLightning className={isActive('/dashboard/rewards') ? 'text-purple-600' : 'text-gray-400'} />
                    <span>Rewards</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Section - Search, Notifications, and User Menu */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden lg:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-48 pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                  />
                  <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>


              {/* Notifications */}
              <div className="relative notifications-menu">
                <button 
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <FaBell className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <div className="p-4 text-center text-gray-500">
                      <FaBell className="mx-auto text-2xl mb-2 text-gray-400" />
                      <p>No notifications found</p>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative user-menu">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{getUserInitials()}</span>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">{user?.displayName || user?.email}</p>
                    </div>
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <FaUser className="text-gray-400" />
                      <span>Profile</span>
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-gray-50"
                    >
                      <FaSignOutAlt className="text-red-400" />
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden mobile-menu"
              >
                {isMenuOpen ? <HiX size={24} className="text-gray-600" /> : <HiMenu size={24} className="text-gray-600" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {(
            <div
              className={`fixed inset-x-0 top-0 bottom-0 bg-white border-t border-gray-100 shadow-lg overflow-y-auto z-50 
                transition-transform duration-300 ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
            >
               {/* Header with GoMining Logo & Close Button */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                {/* GoMining Logo */}
                
                <Link to="/dashboard"className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/50"></div>
                  <h1 className="text-xl md:text-2xl font-bold text-purple-600 whitespace-nowrap">GoMining</h1>
                </Link>

                {/* Close Button */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <AiOutlineClose className="text-2xl" />
                </button>
              </div>

              <div className="py-2 divide-y divide-gray-100">
                {/* Main Navigation Links */}
                <div className="px-3 py-2 space-y-1">
                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === '/dashboard'
                        ? 'bg-purple-50 text-purple-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                      onClick={() => handleNavigation('/dashboard')}
                  >
                    <FaBitcoin className={location.pathname === '/dashboard' ? 'text-purple-600' : 'text-gray-400'} />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    to="/dashboard/wallet"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === '/dashboard/wallet'
                        ? 'bg-purple-50 text-purple-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => handleNavigation('/dashboard/wallet')}
                  >
                    <FaWallet className={location.pathname === '/dashboard/wallet' ? 'text-purple-600' : 'text-gray-400'} />
                    <span>Wallet</span>
                  </Link>

                <Link
                  to="/dashboard/miners"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === '/dashboard/miners'
                        ? 'bg-purple-50 text-purple-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                    onClick={() => handleNavigation('/dashboard/miners')}
                >
                    <FaHammer className={location.pathname === '/dashboard/miners' ? 'text-purple-600' : 'text-gray-400'} />
                  <span>Miners</span>
                </Link>

                <Link
                  to="/dashboard/mining-farm"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === '/dashboard/mining-farm'
                        ? 'bg-purple-50 text-purple-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                    onClick={() => handleNavigation('/dashboard/mining-farm')}
                >
                    <FaChartLine className={location.pathname === '/dashboard/mining-farm' ? 'text-purple-600' : 'text-gray-400'} />
                  <span>Mining Farm</span>
                </Link>

                <Link
                  to="/dashboard/rewards"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === '/dashboard/rewards'
                        ? 'bg-purple-50 text-purple-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                  }`}
                    onClick={() => handleNavigation('/dashboard/rewards')}
                >
                    <BsLightning className={location.pathname === '/dashboard/rewards' ? 'text-purple-600' : 'text-gray-400'} />
                  <span>Rewards</span>
                </Link>
                </div>

                {/* User Section */}
                <div className="px-3 py-2">
                  <div className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{getUserInitials()}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user?.displayName || user?.email}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/dashboard/profile"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/dashboard/profile');
                    }}
                  >
                    <FaUser className="text-gray-400" />
                    <span>Profile Settings</span>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-gray-50 rounded-lg"
                  >
                    <FaSignOutAlt className="text-red-500" />
                    <span>Log out</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="px-3 py-2">
                  <div className="relative px-4 py-3">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                    />
                    <AiOutlineSearch className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 md:pt-0 min-h-screen w-full bg-gray-50">
        <div className="container mx-auto p-4 md:p-6">
          <Routes>
            <Route index element={<MainDashboard />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="miners" element={<Miners showMinerCreation={showMinerCreation} setShowMinerCreation={setShowMinerCreation} />} />
            <Route path="mining-farm" element={<MiningFarm showMinerCreation={showMinerCreation} setShowMinerCreation={setShowMinerCreation} />} />
            <Route path="rewards" element={<Rewards showMinerCreation={showMinerCreation} setShowMinerCreation={setShowMinerCreation} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      {/* Miner Creation Dialog */}
      <MinerCreationDialog 
        isOpen={showMinerCreation} 
        onClose={() => setShowMinerCreation(false)} 
      />
    </div>
  );
};

export default Dashboard;