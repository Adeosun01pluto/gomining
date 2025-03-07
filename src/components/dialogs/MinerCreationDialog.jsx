import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBitcoin, FaChartLine, FaTimes } from 'react-icons/fa';
import { BsLightning } from 'react-icons/bs';
import { handleCreateMiner } from '../../utils/authHelpers';
import {
  PRICE_PER_TH,
  calculateMinerPrice,
  calculateComputingPower,
  calculateMiningRewards,
  formatBTC,
  formatUSD
} from '../../utils/minerCalculations';

const MinerCreationDialog = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [minerPrice, setMinerPrice] = useState(calculateMinerPrice(4));
  const [computingPower, setComputingPower] = useState(4);
  const [selectedEfficiency, setSelectedEfficiency] = useState('20');
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [showMinerTraits, setShowMinerTraits] = useState(false);
  const [useGominingToken, setUseGominingToken] = useState(false);
  const [isEditingPrice, setIsEditingPrice] = useState(false);

  // Current BTC price (in the real app, this would be fetched from an API)
  const btcPrice = 87826.12;

  // Get available computing power options
  const getComputingPowerOptions = () => {
    const standardOptions = [1, 2, 4];
    const customPower = calculateComputingPower(minerPrice);
    
    // If the custom power matches a standard option, return standard options
    if (standardOptions.includes(customPower)) {
      return standardOptions;
    }
    
    // Otherwise, add the custom power to the options
    return [...standardOptions, customPower].sort((a, b) => a - b);
  };

  // Handle price input
  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value) || 0;
    setMinerPrice(newPrice);
    const newPower = calculateComputingPower(newPrice);
    setComputingPower(newPower);
  };

  // Handle power selection
  const handlePowerChange = (power) => {
    setComputingPower(power);
    const newPrice = calculateMinerPrice(power);
    setMinerPrice(newPrice);
  };

  const rewards = calculateMiningRewards({
    computingPower: Number(computingPower),
    btcPrice,
    energyEfficiency: Number(selectedEfficiency),
    useGominingToken
  });

  // Get current computing power options
  const computingPowerOptions = getComputingPowerOptions();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog Content */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg mx-auto my-8 shadow-xl">
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center pr-8">Miner creation</h2>

            {/* Miner Price Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Miner Price</label>
              <div className="relative">
                <input
                  type="number"
                  value={isEditingPrice ? minerPrice : ''}
                  onFocus={() => setIsEditingPrice(true)}
                  onBlur={() => setIsEditingPrice(false)}
                  onChange={handlePriceChange}
                  placeholder={formatUSD(minerPrice)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">USD</span>
                </div>
              </div>
            </div>

            {/* Computing Power Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Computing Power</label>
              <div className="flex gap-2 sm:gap-3">
                {computingPowerOptions.map((power) => (
                  <button
                    key={power}
                    onClick={() => handlePowerChange(power)}
                    className={`flex-1 py-2 px-3 sm:px-4 rounded-full text-sm font-medium transition-all
                      ${computingPower === power
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                      ${power !== 1 && power !== 2 && power !== 4 ? 'relative overflow-hidden' : ''}
                    `}
                  >
                    {power} TH
                    {power !== 1 && power !== 2 && power !== 4 && (
                      <div className="absolute inset-0 bg-yellow-400/10 border-2 border-yellow-400/20 rounded-full pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-500 text-center">
                {formatUSD(PRICE_PER_TH)} per TH/s
              </div>
            </div>

            {/* Energy Efficiency Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Energy Efficiency</label>
              <div className="flex gap-2 sm:gap-3">
                {[
                  { value: '20', label: '20 W/TH', type: 'Optimal' },
                  { value: '15', label: '15 W/TH', type: 'Safe' }
                ].map((efficiency) => (
                  <button
                    key={efficiency.value}
                    onClick={() => setSelectedEfficiency(efficiency.value)}
                    className={`flex-1 py-2 px-3 sm:px-4 rounded-full text-sm font-medium transition-all
                      ${selectedEfficiency === efficiency.value
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {efficiency.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Costs & Rewards Box */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-4">
              {/* Timeframe Selection */}
              <div className="flex gap-2 border-b border-gray-200">
                {['daily', 'monthly', 'yearly'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`pb-2 px-3 sm:px-4 text-sm font-medium capitalize transition-all
                      ${selectedTimeframe === timeframe
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>

              {/* Daily Costs Breakdown */}
              <div className="space-y-2 border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-700">Daily Costs</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Electricity:</span>
                  <span className="font-medium">{formatUSD(rewards.daily.costs.electricity)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee:</span>
                  <span className="font-medium">{formatUSD(rewards.daily.costs.service)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-600">Total Costs:</span>
                  <span>{formatUSD(rewards.daily.costs.total)}</span>
                </div>
              </div>

              {/* Mining Rewards */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Gross Mining Reward:</span>
                  <div className="text-right">
                    <span className="font-medium">{formatBTC(rewards.daily.grossBtc)} BTC</span>
                    <span className="text-gray-500 text-xs block">
                      ({formatUSD(rewards.daily.grossBtc * btcPrice)})
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Net {selectedTimeframe} Reward:</span>
                  <div className="text-right">
                    <span className="font-medium">{formatBTC(rewards[selectedTimeframe].btc)} BTC</span>
                    <span className="text-gray-500 text-xs block">
                      ({formatUSD(rewards[selectedTimeframe].usd)})
                    </span>
                  </div>
                </div>
              </div>

              {/* ROI */}
              <div className="flex justify-between text-sm border-t border-gray-200 pt-4">
                <span className="text-gray-600">Annual ROI:</span>
                <span className="text-green-500 font-medium">
                  {rewards.yearly.roi.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* GoMining Token Discount */}
            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={useGominingToken}
                  onChange={() => setUseGominingToken(!useGominingToken)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
              <span className="text-sm text-gray-600">-20% on maintenance with GOMINING token</span>
            </div>

            {/* Miner Traits */}
            <div>
              <button
                onClick={() => setShowMinerTraits(!showMinerTraits)}
                className="w-full text-left text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                Miner traits
              </button>
              {showMinerTraits && (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Power Consumption:</span>
                    <span className="font-medium">{Number(computingPower) * Number(selectedEfficiency)} W</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Network Connection:</span>
                    <span className="font-medium">Ethernet</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Algorithm:</span>
                    <span className="font-medium">SHA-256</span>
                  </div>
                </div>
              )}
            </div>

            {/* Next Button */}
            <button 
              onClick={() => {
                onClose();
                handleCreateMiner(navigate);
              }}
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinerCreationDialog; 