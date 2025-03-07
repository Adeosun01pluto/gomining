// // Constants for miner calculations
// export const PRICE_PER_TH = 24.99; // Base price per TH/s in USD
// export const BASE_DAILY_BTC_REWARD = 0.00000425; // Base daily BTC reward per TH/s
// export const ELECTRICITY_COST_PER_KWH = 0.12; // Cost per kilowatt-hour in USD
// export const SERVICE_FEE_PERCENTAGE = 15; // Base service fee percentage
// export const ELECTRICITY_DISCOUNT_WITH_TOKEN = 20; // Percentage discount with GoMining token
// export const SERVICE_DISCOUNT_WITH_TOKEN = 20; // Percentage discount with GoMining token

// Constants for miner calculations
export const PRICE_PER_TH = 24.99; // Base price per TH/s in USD
export const BASE_DAILY_BTC_REWARD = 0.00000425; // Base daily BTC reward per TH/s
export const ELECTRICITY_COST_PER_KWH = 0.12; // Cost per kilowatt-hour in USD
export const SERVICE_FEE_PERCENTAGE = 10; // Base service fee percentage
export const ELECTRICITY_DISCOUNT_WITH_TOKEN = 20; // Percentage discount with GoMining token
export const SERVICE_DISCOUNT_WITH_TOKEN = 20; // Percentage discount with GoMining token

/**
 * Calculate miner price based on computing power
 * @param {number} computingPower - Power in TH/s
 * @returns {number} Price in USD
 */
export const calculateMinerPrice = (computingPower) => {
  return computingPower * PRICE_PER_TH;
};

/**
 * Calculate computing power based on miner price
 * @param {number} minerPrice - Price in USD
 * @returns {number} Power in TH/s
 */
export const calculateComputingPower = (minerPrice) => {
  return Math.round(minerPrice / PRICE_PER_TH);
};

/**
 * Calculate daily electricity cost
 * @param {number} computingPower - Power in TH/s
 * @param {number} energyEfficiency - Energy efficiency in W/TH
 * @param {number} btcPrice - Current BTC price in USD
 * @returns {number} Daily electricity cost in USD
 */
const calculateDailyElectricityCost = (computingPower, energyEfficiency, btcPrice) => {
  // Convert W/TH to kW and multiply by 24 hours
  const dailyKWh = (computingPower * energyEfficiency * 24) / 1000;
  return dailyKWh * ELECTRICITY_COST_PER_KWH;
};

/**
 * Calculate daily service cost
 * @param {number} dailyBtcReward - Daily BTC reward
 * @param {number} btcPrice - Current BTC price in USD
 * @returns {number} Daily service cost in USD
 */
const calculateDailyServiceCost = (dailyBtcReward, btcPrice) => {
  return (dailyBtcReward * btcPrice * SERVICE_FEE_PERCENTAGE) / 100;
};

/**
 * Calculate mining rewards with the new formula
 * @param {Object} params - Calculation parameters
 * @param {number} params.computingPower - Power in TH/s
 * @param {number} params.btcPrice - Current BTC price in USD
 * @param {number} params.energyEfficiency - Energy efficiency in W/TH
 * @param {boolean} params.useGominingToken - Whether GoMining token is used
 * @returns {Object} Calculated rewards
 */
export const calculateMiningRewards = ({
  computingPower,
  btcPrice,
  energyEfficiency,
  useGominingToken
}) => {
  // Base daily mining reward calculation
  const dailyBtcMiningReward = computingPower * BASE_DAILY_BTC_REWARD;
  
  // Calculate costs
  const dailyElectricityCost = calculateDailyElectricityCost(computingPower, energyEfficiency, btcPrice);
  const dailyServiceCost = calculateDailyServiceCost(dailyBtcMiningReward, btcPrice);

  // Apply discounts if using GoMining token
  const discountMultiplier = useGominingToken ? 
    (100 - ((ELECTRICITY_DISCOUNT_WITH_TOKEN + SERVICE_DISCOUNT_WITH_TOKEN) / 2)) / 100 : 1;

  // Calculate total costs with discounts
  const totalDailyCostsInUSD = (dailyElectricityCost + dailyServiceCost) * discountMultiplier;
  
  // Convert costs to BTC
  const totalDailyCostsInBTC = totalDailyCostsInUSD / btcPrice;

  // Calculate net daily reward
  const netDailyBtcReward = dailyBtcMiningReward - totalDailyCostsInBTC;
  const netDailyUsdReward = netDailyBtcReward * btcPrice;

  // Calculate monthly and yearly values
  const monthlyBtcReward = netDailyBtcReward * 30;
  const monthlyUsdReward = netDailyUsdReward * 30;
  const yearlyBtcReward = netDailyBtcReward * 365;
  const yearlyUsdReward = netDailyUsdReward * 365;

  // Calculate ROI
  const minerPrice = calculateMinerPrice(computingPower);
  const yearlyRoi = (yearlyUsdReward / minerPrice) * 100;

  return {
    daily: {
      btc: netDailyBtcReward,
      usd: netDailyUsdReward,
      costs: {
        electricity: dailyElectricityCost,
        service: dailyServiceCost,
        total: totalDailyCostsInUSD
      },
      grossBtc: dailyBtcMiningReward
    },
    monthly: {
      btc: monthlyBtcReward,
      usd: monthlyUsdReward
    },
    yearly: {
      btc: yearlyBtcReward,
      usd: yearlyUsdReward,
      roi: yearlyRoi
    },
    maintenanceFee: {
      btc: totalDailyCostsInBTC,
      percentage: SERVICE_FEE_PERCENTAGE,
      discountedPercentage: useGominingToken ? 
        SERVICE_FEE_PERCENTAGE * (1 - SERVICE_DISCOUNT_WITH_TOKEN / 100) : 
        SERVICE_FEE_PERCENTAGE
    }
  };
};

/**
 * Format BTC value to string
 * @param {number} value - BTC value
 * @returns {string} Formatted BTC value
 */
export const formatBTC = (value) => {
  return value.toFixed(8);
};

/**
 * Format USD value to string with comma separators
 * @param {number} value - USD value
 * @returns {string} Formatted USD value
 */
export const formatUSD = (value) => {
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}; 