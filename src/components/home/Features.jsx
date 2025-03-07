// components/home/Features.jsx
import mine from "../../assets/main-phone-1.webp"
const Features = () => {
  const features = [
    {
      title: "Start mining with any budget",
      description: "Each miner is unique and generated at the time of purchase. You can also sell your miner on the GoMining marketplace whenever you wish",
      price: "$27.99",
      returnRate: "40%",
      image: mine
    }
  ];

  return (
    <section className="py-8 px-4 sm:py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <div key={index} className="grid md:grid-cols-2 gap-8 w-full items-center">
          <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold py-2 sm:py-4 text-black">
              {feature.title}
            </h2>
            <p className="text-black/60 text-sm sm:text-md md:text-lg font-semibold w-full sm:w-[85%]">
              {feature.description}
            </p>
            <div className="pt-4 grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <p className="text-black text-xs sm:text-sm md:text-lg font-semibold">Digital miners from</p>
                <p className="text-2xl sm:text-3xl md:text-5xl py-2 font-semibold text-black">{feature.price}</p>
              </div>
              <div>
                <p className="text-black text-xs sm:text-sm md:text-lg font-semibold">Annual payback from</p>
                <p className="text-2xl sm:text-3xl md:text-5xl py-2 font-semibold text-black">{feature.returnRate}</p>
              </div>
            </div>
            <span className="text-gray-400 text-xs sm:text-sm font-semibold block">
              **In BTC rewards. Calculated based on current BTC price and results may vary
            </span>
            <div className="flex flex-wrap gap-3 sm:gap-4 font-semibold pt-3">
              <button className="bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full hover:bg-purple-700">
                See all miners
              </button>
              <button className="border border-gray-400 text-black px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full hover:border-gray-800">
                Estimate rewards
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center w-full order-1 md:order-2">
            <div className="w-full sm:w-[90%] pt-4 sm:pt-8 rounded-t-3xl justify-center flex items-center bg-gray-200/80">
              <img
                src={feature.image}
                alt="Digital Miner"
                className="h-auto w-[80%] rounded-lg"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;