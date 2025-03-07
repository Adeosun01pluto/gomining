// components/home/WalletSection.jsx
import { Bitcoin } from 'lucide-react';
import btcwallet from "../../assets/main-phone-2.webp"
const WalletSection = () => {
  // return (
  //   <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
  //     <div className="grid md:grid-cols-2 gap-12 items-center">
  //       {/* Left side - Wallet Image */}
  //       <div className="rounded-3xl bg-gray-100 p-8 h-full flex flex-col items-center">
  //         <div className="bg-white rounded-2xl p-6 max-w-sm mx-auto w-full h-full">
  //           <img src={btcwallet} alt="" />
  //         </div>
  //       </div>

  //       {/* Right side - Content */}
  //       <div className="space-y-4">
  //         <h2 className="text-3xl sm:text-6xl font-semibold py-2 sm:py-4 text-black">
  //           Daily BTC rewards directly to your wallet
  //         </h2>
  //         <p className="text-black/60 text-md font-semibold sm:text-lg w-100 sm:w-[85%]">
  //           Connect your BTC wallet in seconds and get a lifetime of solo mining bitcoin rewards to it. 
  //           Receive your BTC securely with zero fees
  //         </p>
  //         <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 font-semibold">
  //           Start earning BTC
  //         </button>
  //       </div>
  //     </div>

  //     {/* Stats Section */}
  //     <div className="grid md:grid-cols-2 gap-8 mt-12">
  //       <div className="bg-gray-600 bg-opacity-5 rounded-2xl p-8">
  //         <h3 className="text-5xl font-bold text-black mb-2">221 248</h3>
  //         <p className="text-black font-semibold text-lg">Digital miners purchased</p>
  //       </div>
  //       <div className="bg-gray-600 bg-opacity-5 rounded-2xl p-8">
  //         <h3 className="text-5xl font-bold text-black mb-2">3 900 BTC</h3>
  //         <p className="text-black font-semibold text-lg">Earned by digital miner holders</p>
  //       </div>
  //     </div>
  //   </section>
  // );
  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left side - Wallet Image */}
        <div className="rounded-3xl bg-gray-100 p-4 sm:p-8 h-full flex flex-col items-center order-2 md:order-1">
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full h-full">
            <img 
              src={btcwallet} 
              alt="Wallet Preview" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="space-y-4 sm:space-y-6 order-1 md:order-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold py-2 sm:py-4 text-black">
            Daily BTC rewards directly to your wallet
          </h2>
          <p className="text-black/60 text-sm sm:text-md md:text-lg font-semibold w-full sm:w-[85%]">
            Connect your BTC wallet in seconds and get a lifetime of solo mining bitcoin rewards to it. 
            Receive your BTC securely with zero fees
          </p>
          <button className="bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full hover:bg-purple-700 font-semibold">
            Start earning BTC
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 mt-8 sm:mt-12">
        <div className="bg-gray-600 bg-opacity-5 rounded-2xl p-6 sm:p-8">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2">221 248</h3>
          <p className="text-black font-semibold text-sm sm:text-base lg:text-lg">Digital miners purchased</p>
        </div>
        <div className="bg-gray-600 bg-opacity-5 rounded-2xl p-6 sm:p-8">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2">3 900 BTC</h3>
          <p className="text-black font-semibold text-sm sm:text-base lg:text-lg">Earned by digital miner holders</p>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;
