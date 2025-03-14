import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaBolt } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';
import { FaSlidersH } from 'react-icons/fa';

// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Card, CardHeader, CardTitle, CardContent } from '@shadcn/ui';
import com from "../../assets/silver0001.webp"
import { handleCreateMiner } from '../../utils/authHelpers';
import {
  PRICE_PER_TH,
  calculateMinerPrice,
  calculateComputingPower,
  calculateMiningRewards,
  formatBTC,
  formatUSD
} from '../../utils/minerCalculations';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Custom Range Slider Component
const CustomRangeSlider = ({ value, min, max, onChange, step, color }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step || 1}
          value={value}
          onChange={onChange}
          className={`w-full h-4 rounded-lg appearance-none cursor-pointer bg-gray-200
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-${color}-600
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:relative
            [&::-webkit-slider-thumb]:z-[1]
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-${color}-600
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:shadow-lg`}
          style={{
            background: `linear-gradient(to right, ${color === 'purple' ? '#9333ea' : color === 'green' ? '#22c55e' : '#f97316'} ${percentage}%, #e5e7eb ${percentage}%)`
          }}
        />
      </div>
    </div>
  );
};

const RewardsCalculator = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const [minerPrice, setMinerPrice] = useState(calculateMinerPrice(4));
  const [computingPower, setComputingPower] = useState(4);
  const [energyEfficiency, setEnergyEfficiency] = useState(20);
  const [expectedBTCPrice, setExpectedBTCPrice] = useState(110000);
  const [useGominingToken, setUseGominingToken] = useState(false);

  // Handle price slider change
  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setMinerPrice(newPrice);
    const newPower = calculateComputingPower(newPrice);
    setComputingPower(newPower);
  };

  // Handle power slider change
  const handlePowerChange = (e) => {
    const newPower = Number(e.target.value);
    setComputingPower(newPower);
    const newPrice = calculateMinerPrice(newPower);
    setMinerPrice(newPrice);
  };

  const rewards = calculateMiningRewards({
    computingPower,
    btcPrice: expectedBTCPrice,
    energyEfficiency,
    useGominingToken
  });

  const handleCreateMiner = () => {
    if (user) {
      navigate("/dashboard/miners");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mb-16">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-4">
            Estimate your BTC rewards
          </h1>
          <p className="text-center w-full sm:w-[80%] lg:w-[60%] font-semibold mx-auto text-gray-600 mb-8">
            Choose the power and energy efficiency of your future digital miner and find out how much BTC it may bring you
          </p>
        </div>

        <div className="min-h-[80vh] bg-gray-100 rounded-3xl flex flex-col lg:flex-row gap-8 w-full">
          <div className="p-4 sm:p-6 rounded-xl w-full lg:w-[70%]">
            {/* Miner Price Slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">DIGITAL MINER PRICE</span>
                <span className="font-bold">{formatUSD(minerPrice)}</span>
              </div>
              <CustomRangeSlider
                value={minerPrice}
                min={PRICE_PER_TH}
                max={PRICE_PER_TH * 100}
                step={PRICE_PER_TH}
                onChange={handlePriceChange}
                color="purple"
              />
              <div className="mt-2 text-xs text-gray-500 text-center">
                {formatUSD(PRICE_PER_TH)} per TH/s
              </div>
            </div>

            {/* Computing Power Slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">COMPUTING POWER</span>
                <span className="font-bold">{computingPower} TH</span>
              </div>
              <CustomRangeSlider
                value={computingPower}
                min={1}
                max={100}
                onChange={handlePowerChange}
                color="green"
              />
            </div>

            {/* Energy Efficiency Selection */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">ENERGY EFFICIENCY</span>
                <span className="font-bold">{energyEfficiency} W/TH</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setEnergyEfficiency(15)}
                  className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    energyEfficiency === 15 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <BsLightningChargeFill className={energyEfficiency === 15 ? 'text-yellow-300' : 'text-purple-600'} />
                  <span>15 W/TH</span>
                </button>
                <button
                  onClick={() => setEnergyEfficiency(20)}
                  className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    energyEfficiency === 20 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <FaBolt className={energyEfficiency === 20 ? 'text-yellow-300' : 'text-purple-600'} />
                  <span>20 W/TH</span>
                </button>
              </div>
            </div>

            {/* Expected BTC Price Slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">EXPECTED BTC PRICE</span>
                <span className="font-bold">{formatUSD(expectedBTCPrice)}</span>
              </div>
              <CustomRangeSlider
                value={expectedBTCPrice}
                min={10000}
                max={200000}
                step={1000}
                onChange={(e) => setExpectedBTCPrice(Number(e.target.value))}
                color="orange"
              />
            </div>

            {/* GoMining Token Toggle */}
            <div className="flex items-center gap-2 flex-wrap">
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
              <FaInfoCircle className="w-4 h-4 text-gray-400 cursor-help" />
            </div>
          </div>

          {/* Results Card */}
          <div className="flex flex-col font-semibold bg-gray-900 text-white w-full lg:w-[35%] p-6 rounded-xl lg:rounded-tr-3xl lg:rounded-br-3xl">
            <div className="mx-auto w-24 sm:w-32 h-24 sm:h-32 mb-6">
              <img src={com} className='w-full h-full object-cover' alt="Mining Hardware" />
            </div>

            {/* Daily Costs */}
            <div className="space-y-2 border-b border-gray-700 pb-4 mb-4">
              <h3 className="text-lg font-medium">Daily Costs</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Electricity:</span>
                <span>{formatUSD(rewards.daily.costs.electricity)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Service Fee:</span>
                <span>{formatUSD(rewards.daily.costs.service)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-400">Total Costs:</span>
                <span>{formatUSD(rewards.daily.costs.total)}</span>
              </div>
            </div>

            {/* Mining Rewards */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Mining Rewards</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Daily Gross:</span>
                  <div className="text-right">
                    <span className="font-medium">{formatBTC(rewards.daily.grossBtc)} BTC</span>
                    <span className="text-sm text-gray-400 block">
                      ({formatUSD(rewards.daily.grossBtc * expectedBTCPrice)})
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Daily Net:</span>
                  <div className="text-right">
                    <span className="font-medium">{formatBTC(rewards.daily.btc)} BTC</span>
                    <span className="text-sm text-gray-400 block">
                      ({formatUSD(rewards.daily.usd)})
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Monthly Net:</span>
                  <div className="text-right">
                    <span className="font-medium">{formatBTC(rewards.monthly.btc)} BTC</span>
                    <span className="text-sm text-gray-400 block">
                      ({formatUSD(rewards.monthly.usd)})
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Annual ROI:</span>
                  <span className="text-green-400">{rewards.yearly.roi.toFixed(2)}%</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCreateMiner}
              className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Create miner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsCalculator;