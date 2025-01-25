// components/home/DataCenterSection.jsx
const DataCenterSection = () => {
    return (
      <section className="py-8 px-4 sm:px-6 w-full mx-auto my-8 bg-gray-300 rounded-3xl">
        <div className="w-full h-48 bg-blue-300 rounded-2xl my-4 ">

        </div>
        <div className=" rounded-3xl p-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-black leading-tight">
                Powered by physical bitcoin mining{' '}
                <span className="text-purple-500">data centers</span>
              </h2>
              <p className="text-black">
                Each digital miner is based on the fleet of mining equipment that extracts BTC every day. 
                This bitcoin mining setup allows our digital miners to earn BTC rewards for you
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition">
                  Get a digital miner
                </button>
                <button className="border border-gray-600 text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition">
                  About data centers
                </button>
              </div>
            </div>
  
            {/* Right side - Stats */}
            <div className="space-y-8">
              <div className=" rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    ⚡
                  </div>
                  <h3 className="text-2xl font-bold text-black">6 742 106 TH</h3>
                </div>
                <p className="text-black text-sm">
                  The power of data centers by GoMining's verified service providers,
                  a portion of which you benefit from when purchasing a digital miner
                </p>
              </div>
  
              <div className=" rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    ♾️
                  </div>
                  <h3 className="text-2xl font-bold text-black">99%</h3>
                </div>
                <p className="text-black text-sm">
                  Continuous uptime of data centers, ensured by a dedicated team of
                  professional technicians and engineers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default DataCenterSection;
  