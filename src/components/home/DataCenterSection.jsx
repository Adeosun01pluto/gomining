// components/home/DataCenterSection.jsx
import data from "../../assets/mining-info.webp"
import { BsLightning, BsInfinity } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";


const DataCenterSection = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleNavigation = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 w-[95%] sm:w-[90%] mx-auto my-4 sm:my-8 bg-gray-300 rounded-3xl">
      <div className="w-full rounded-2xl my-4">
        <img 
          src={data} 
          alt="Data Center" 
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>
      <div className="rounded-3xl p-4 sm:p-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left side - Content */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight">
              Powered by physical bitcoin mining{' '}
              <span className="text-purple-500">data centers</span>
            </h2>
            <p className="text-gray-800 font-semibold text-sm sm:text-base">
              Each digital miner is based on the fleet of mining equipment that extracts BTC every day. 
              This bitcoin mining setup allows our digital miners to earn BTC rewards for you
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => handleNavigation("/dashboard/miners")}
                className="bg-purple-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full hover:bg-purple-700 transition"
              >
                Get a digital miner
              </button>
              <button
                onClick={() => handleNavigation("/dashboard")}
                className="border border-gray-600 text-black font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full hover:border-gray-700 transition"
              >
                About data centers
              </button>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className="space-y-6 sm:space-y-8">
            <div className="rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="font-bold w-8 h-8 text-white bg-green-500 rounded-full flex items-center justify-center">
                  <BsLightning size={20} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black">6 742 106 TH</h3>
              </div>
              <p className="text-gray-800 font-semibold text-sm sm:text-base">
                The power of data centers by GoMining's verified service providers,
                a portion of which you benefit from when purchasing a digital miner
              </p>
            </div>

            <div className="rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center font-bold justify-center text-white">
                  <BsInfinity size={20} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black">99%</h3>
              </div>
              <p className="text-gray-800 font-semibold text-sm sm:text-base">
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
  