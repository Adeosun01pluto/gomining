import React, { useState } from 'react';
import { FaInfoCircle } from "react-icons/fa"; // Info icon

const RewardsCalculator = () => {
  const [minerPrice, setMinerPrice] = useState(109);
  const [computingPower, setComputingPower] = useState(4);
  const [energyEfficiency, setEnergyEfficiency] = useState(20);
  const [expectedBTCPrice, setExpectedBTCPrice] = useState(110000);
  const [useGominingToken, setUseGominingToken] = useState(false);

  // Calculate rewards based on inputs
  const calculateRewards = () => {
    // This is a simplified calculation - you'd want to use actual BTC mining formulas
    const dailyReward = (computingPower * 0.0000625) * (expectedBTCPrice / 100000);
    const monthlyReward = dailyReward * 30;
    const annualPayback = (monthlyReward * 12 / minerPrice) * 100;

    return {
      daily: dailyReward.toFixed(8),
      monthly: monthlyReward.toFixed(8),
      annualPayback: annualPayback.toFixed(2)
    };
  };

  const rewards = calculateRewards();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-center mb-4">Estimate your BTC rewards</h1>
        <p className="text-center text-gray-600 mb-8">
          Choose the power and energy efficiency of your future digital miner and find out how much BTC it may bring you
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            {/* Miner Price Slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">DIGITAL MINER PRICE</span>
                <span className="font-bold">${minerPrice}</span>
              </div>
              <input
                type="range"
                min="25"
                max="400"
                value={minerPrice}
                onChange={(e) => setMinerPrice(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Computing Power Slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">COMPUTING POWER</span>
                <span className="font-bold">{computingPower} TH</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={computingPower}
                onChange={(e) => setComputingPower(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Energy Efficiency Toggle */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">ENERGY EFFICIENCY</span>
                <span className="font-bold">{energyEfficiency} W/TH</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setEnergyEfficiency(15)}
                  className={`flex-1 p-2 rounded ${
                    energyEfficiency === 15 ? 'bg-purple-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  15 W/TH
                </button>
                <button
                  onClick={() => setEnergyEfficiency(20)}
                  className={`flex-1 p-2 rounded ${
                    energyEfficiency === 20 ? 'bg-purple-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  20 W/TH
                </button>
              </div>
            </div>

            {/* Expected BTC Price Slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">EXPECTED BTC PRICE</span>
                <span className="font-bold">${expectedBTCPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="1000"
                value={expectedBTCPrice}
                onChange={(e) => setExpectedBTCPrice(Number(e.target.value))}
                className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* GoMining Token Toggle */}
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
              <span className="text-sm">-20% on maintenance with GOMINING token</span>
              <FaInfoCircle className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-gray-900 text-white p-6 rounded-xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg">Average BTC rewards before fees</h3>
              <img src="/api/placeholder/64/64" alt="Miner" className="rounded" />
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span>Daily</span>
                <div className="flex items-center gap-2">
                  <span>${(Number(rewards.daily) * expectedBTCPrice).toFixed(2)}</span>
                  <span className="text-gray-400">{rewards.daily} ₿</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span>Per month</span>
                <div className="flex items-center gap-2">
                  <span>${(Number(rewards.monthly) * expectedBTCPrice).toFixed(2)}</span>
                  <span className="text-gray-400">{rewards.monthly} ₿</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span>Annual payback in BTC</span>
                <span>{rewards.annualPayback}%</span>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-8">
              *BTC rewards are shown before maintenance fees, while payback is after fees. Values are approximate and depend on network difficulty, BTC price, and other factors
            </p>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded">
              Create miner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsCalculator;