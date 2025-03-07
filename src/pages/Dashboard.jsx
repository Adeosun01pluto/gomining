import React, { useState, useEffect } from "react";
import { FaBitcoin, FaWallet, FaChartLine, FaHammer, FaCog, FaPlus, FaUser, FaPencilAlt, FaQuestionCircle, FaSignOutAlt, FaBell, FaGlobe, FaShieldAlt, FaKey } from "react-icons/fa";
import { AiOutlineTransaction, AiOutlineSearch } from "react-icons/ai";
import { BsGraphUp, BsLightning } from "react-icons/bs";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { getAuth, signOut } from 'firebase/auth';
import NotFound from './NotFound';
import MinerCreationDialog from '../components/dialogs/MinerCreationDialog';
import WalletConnectionDialog from '../components/dialogs/WalletConnectionDialog';

// Dashboard Components
const MainDashboard = () => {
  const [hasData] = useState(false); // Temporary state for demo, replace with actual data check
  const [showMinerCreation, setShowMinerCreation] = useState(false);

  if (!hasData) {
    return (
      <div className="space-y-6 md:space-y-8 md:pt-0">
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              Watch your miner's performance
            </h1>
            <p className="text-gray-600 text-lg">
              Keep track of your miner metrics and upgrade them to earn even more BTC every day.
            </p>
            <div className="p-8">
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Power of Purchased Digital Miners</h3>
                <p className="text-3xl font-bold text-purple-600">0 TH</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setShowMinerCreation(true)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaPlus />
                  <span>Create miner</span>
                </button>
                <button className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                  Start for free
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[60%]">

          <MinerCreationDialog 
            isOpen={showMinerCreation} 
            onClose={() => setShowMinerCreation(false)} 
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-lg font-semibold">Total Balance</h3>
            <FaBitcoin className="text-xl md:text-2xl opacity-80" />
          </div>
          <p className="text-2xl md:text-3xl font-bold mt-3 md:mt-4">4,043.5599 BTC</p>
          <p className="text-xs md:text-sm opacity-80 mt-2">≈ $134,510.15 USD</p>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">Mining Power</h3>
            <BsLightning className="text-xl md:text-2xl text-yellow-500" />
          </div>
          <p className="text-2xl md:text-3xl font-bold mt-3 md:mt-4 text-gray-800">127,402 TH/s</p>
          <p className="text-xs md:text-sm text-gray-500 mt-2">+2.5% from last week</p>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">Active Miners</h3>
            <FaHammer className="text-xl md:text-2xl text-gray-600" />
          </div>
          <p className="text-2xl md:text-3xl font-bold mt-3 md:mt-4 text-gray-800">24</p>
          <p className="text-xs md:text-sm text-gray-500 mt-2">3 pending activation</p>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">Daily Rewards</h3>
            <FaChartLine className="text-xl md:text-2xl text-green-500" />
          </div>
          <p className="text-2xl md:text-3xl font-bold mt-3 md:mt-4 text-gray-800">0.0234 BTC</p>
          <p className="text-xs md:text-sm text-gray-500 mt-2">≈ $780.45 USD</p>
        </div>
      </div>

      {/* Mining Farm Section */}
      <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Mining Farm</h2>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto">
            <FaPlus />
            <span>Create Miner</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((miner) => (
            <div key={miner} className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Miner #{miner}</h3>
                <span className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm bg-green-100 text-green-600">Active</span>
              </div>
              <div className="space-y-2 md:space-y-3 text-sm md:text-base">
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
              <button className="w-full mt-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm md:text-base">
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

  if (!hasBalance) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <div className="max-w-2xl mx-auto text-center py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Connect your wallet</h2>
          <p className="text-gray-600 mb-8">
            Link your Bitcoin wallet to start receiving mining rewards directly and securely.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Wallet Balance</h3>
            <p className="text-3xl font-bold text-purple-600">0.00000000 BTC</p>
            <p className="text-sm text-gray-500 mt-1">≈ $0.00 USD</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowWalletConnection(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Connect wallet
            </button>
            <button className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
              Learn more
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
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Wallet</h2>
      {/* Wallet content here */}
    </div>
  );
};

const Transactions = () => (
  <div className="p-6 bg-white rounded-xl shadow-sm">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Transactions</h2>
    {/* Transactions content here */}
  </div>
);

const Statistics = () => (
  <div className="p-6 bg-white rounded-xl shadow-sm">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Statistics</h2>
    {/* Statistics content here */}
  </div>
);

const Settings = () => (
  <div className="p-6 bg-white rounded-xl shadow-sm">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
    {/* Settings content here */}
  </div>
);

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
                <h2 className="text-xl font-bold text-gray-800">{user?.displayName || user?.email}</h2>
                <span className="text-sm text-gray-500">
                  {user?.emailVerified ? '(Verified)' : '(Not Verified)'}
                </span>
              </div>
              <p className="text-gray-600">Email: {user?.email}</p>
              <p className="text-gray-600">User ID: {user?.uid}</p>
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
const Miners = () => {
  const [hasMiners] = useState(false); // Temporary state for demo
  const [showMinerCreation, setShowMinerCreation] = useState(false);

  if (!hasMiners) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <div className="max-w-2xl mx-auto text-center py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Build your mining farm</h2>
          <p className="text-gray-600 mb-8">
            Gather your miners into a powerful collection and boost their performance to maximize your rewards.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Mining Farms</h3>
            <p className="text-3xl font-bold text-purple-600">0 miners</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowMinerCreation(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <FaPlus />
              <span>Create miner</span>
            </button>
            <button className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
              Start for free
            </button>
          </div>
        </div>

        <MinerCreationDialog 
          isOpen={showMinerCreation} 
          onClose={() => setShowMinerCreation(false)} 
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Miners</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((miner) => (
          <div key={miner} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Miner #{miner}</h3>
              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">Active</span>
            </div>
            <div className="space-y-3">
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
            <button className="w-full mt-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const MiningFarm = () => {
  const [hasFarms] = useState(false); // Temporary state for demo
  const [showMinerCreation, setShowMinerCreation] = useState(false);

  if (!hasFarms) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <div className="max-w-2xl mx-auto text-center py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Scale your mining operation</h2>
          <p className="text-gray-600 mb-8">
            Create and manage multiple mining farms to increase your daily BTC rewards and maximize efficiency.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Active Farms</h3>
            <p className="text-3xl font-bold text-purple-600">No farms yet</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowMinerCreation(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <FaPlus />
              <span>Create farm</span>
            </button>
            <button className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
              Learn more
            </button>
          </div>
        </div>

        <MinerCreationDialog 
          isOpen={showMinerCreation} 
          onClose={() => setShowMinerCreation(false)} 
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mining Farm</h2>
        <button 
          onClick={() => setShowMinerCreation(true)}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto"
        >
          <FaPlus />
          <span>Create Miner</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((farm) => (
          <div key={farm} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Farm #{farm}</h3>
              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">Active</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Power:</span>
                <span className="font-medium">127.5 TH/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Miners:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Rewards:</span>
                <span className="font-medium">0.0234 BTC</span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Rewards = () => {
  const [hasRewards] = useState(false); // Temporary state for demo

  if (!hasRewards) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <div className="max-w-2xl mx-auto text-center py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Earn daily BTC rewards</h2>
          <p className="text-gray-600 mb-8">
            Connect your BTC wallet in seconds and get a lifetime of rewards. Receive your BTC securely with zero fees.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Total Rewards Earned</h3>
            <p className="text-3xl font-bold text-purple-600">0.00000000 BTC</p>
            <p className="text-sm text-gray-500 mt-1">≈ $0.00 USD</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
              <FaPlus />
              <span>Create miner</span>
            </button>
            <button className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
              Connect wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mining Rewards</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Total Rewards</h3>
              <FaBitcoin className="text-2xl opacity-80" />
            </div>
            <p className="text-3xl font-bold mt-4">4.5599 BTC</p>
            <p className="text-sm opacity-80 mt-2">≈ $134,510.15 USD</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Daily Average</h3>
              <FaChartLine className="text-2xl text-green-500" />
            </div>
            <p className="text-3xl font-bold mt-4 text-gray-800">0.0234 BTC</p>
            <p className="text-sm text-gray-500 mt-2">≈ $780.45 USD</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Monthly Estimate</h3>
              <BsLightning className="text-2xl text-yellow-500" />
            </div>
            <p className="text-3xl font-bold mt-4 text-gray-800">0.702 BTC</p>
            <p className="text-sm text-gray-500 mt-2">≈ $23,413.50 USD</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800">Recent Rewards</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="p-6">Date</th>
                  <th className="p-6">Amount</th>
                  <th className="p-6">Type</th>
                  <th className="p-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[1, 2, 3, 4, 5].map((reward) => (
                  <tr key={reward} className="text-gray-800">
                    <td className="p-6">2024-03-19 14:30</td>
                    <td className="p-6 font-medium">+0.0023 BTC</td>
                    <td className="p-6">Mining Reward</td>
                    <td className="p-6">
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
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
                <Link to="/"className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/50"></div>
                  <h1 className="text-xl md:text-2xl font-bold text-purple-600 whitespace-nowrap">GoMining</h1>
                </Link>
                <div className="hidden md:flex text-sm items-center ml-2 lg:ml-8 space-x-2">
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
                    <span>Mining Farm</span>
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
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100">
              <div className="px-4 py-3 space-y-2">
                <Link
                  to="/dashboard/miners"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive('/dashboard/miners')
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaHammer />
                  <span>Miners</span>
                </Link>

                <Link
                  to="/dashboard/mining-farm"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive('/dashboard/mining-farm')
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaChartLine />
                  <span>Mining Farm</span>
                </Link>

                <Link
                  to="/dashboard/rewards"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive('/dashboard/rewards')
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BsLightning />
                  <span>Rewards</span>
                </Link>

                {/* Mobile Search */}
                <div className="px-4 py-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                    />
                    <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
            <Route path="miners" element={<Miners />} />
            <Route path="mining-farm" element={<MiningFarm />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;