import React from "react";
import hero from "../../assets/home-hero.webp";
// import heromd from "../../assets/home-hero.webp";

const Hero = () => {
  return (
    <div className="relative bg-[#0B0B1A] md:min-h-[100vh] flex flex-col">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-3xl tracking-tight font-semibold text-white sm:text-5xl md:text-5xl">
            DIGITAL MINERS THAT EARN DAILY
            <span className="block">BITCOIN REWARDS</span>
          </h1>
          <p className="mt-3 text-sm md:w-[90%] mx-auto font-semibold text-gray-300 md:mt-5 md:text-lg">
            Go mining right from your phone and harness the power of verified
            data centers. It's mining made easy, anytime, anywhere!
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-full shadow">
              <a
                href="/get-started"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-md font-semibold rounded-full text-white bg-purple-600 hover:bg-purple-700 md:py-2 md:text-lg md:px-7"
              >
                Get a digital miner
              </a>
            </div>
            <div className="mt-3 rounded-full shadow sm:mt-0 sm:ml-3">
              <a
                href="/learn-more"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-md font-semibold rounded-full text-gray-300 bg-gray-800 hover:bg-gray-700 md:py-2 md:text-lg md:px-7"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Background Image */}
      <div className="flex-1 w-full md:absolute md:inset-0 md:top-20 md:scale-100 mt-[-20px] sm:mt-0">
        <img
          className="w-full h-auto object-cover"
          src={hero}
          alt="Digital miners illustration"
        />
      </div>
    </div>
  );
};

export default Hero;
