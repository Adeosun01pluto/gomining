import { FaArrowRight, FaChartLine } from "react-icons/fa";
import { BsLightningCharge } from "react-icons/bs";

const RecentPayments = () => {
  const payments = [
    {
      id: 1,
      time: "1 minute ago",
      miner: {
        name: "Minebox #148236",
        image: "https://storage.googleapis.com/gmt-gendalf-prod/ce1a6be7-f940-40a4-bb3d-33484214a61a-9024770-0c38104f-0f3d-4b7e-866f-b16b1f6fc1a9-small.png", // You'll need to add these images to your assets
        hashrateBefore: "20.79",
        hashrateAfter: "22.51"
      },
      type: "Upgrade",
      holder: "3952"
    },
    {
      id: 2,
      time: "3 minutes ago",
      miner: {
        name: "Minebox #148237",
        image: "https://storage.googleapis.com/gmt-gendalf-prod/dd0befd8-5a0c-44dc-bce3-abd2bd5bea93-1022314-aa5af9c5-626f-44b9-bc36-9761e7870120-small.png",
        hashrateBefore: "18.45",
        hashrateAfter: "21.32"
      },
      type: "Upgrade",
      holder: "6365"
    },
    {
      id: 3,
      time: "5 minutes ago",
      miner: {
        name: "Minebox #148238",
        image: "https://storage.googleapis.com/gmt-gendalf-prod/ff1c5f24-3532-4af4-9912-d63fa8d2b1cd-19117656-e87ba790-1425-4adb-9819-1f62eb200e3f-small.png",
        hashrateBefore: "15.92",
        hashrateAfter: "19.87"
      },
      type: "Upgrade",
      holder: "4521"
    },
    {
      id: 4,
      time: "6 minutes ago",
      miner: {
        name: "Minebox #148239",
        image: "https://storage.googleapis.com/gmt-gendalf-prod/692f018b-036b-457f-b535-f8bae5f76896-5845854-ab127b0a-cae8-48b3-9161-42c5d873da82-small.png",
        hashrateBefore: "21.00",
        hashrateAfter: "32.87"
      },
      type: "Upgrade",
      holder: "521"
    }
  ];
  
  return (
    <div className=" w-[95%] sm:w-[90%] mx-auto my-4 sm:my-8 bg-gray-300 rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 p-4 rounded-t-2xl">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-white font-semibold text-sm">Time</div>
          <div className="text-white font-semibold text-sm">Miner</div>
          <div className="text-white font-semibold text-sm">Type</div>
          <div className="text-white font-semibold text-sm text-center">Holder</div>
        </div>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-100">
        {payments.map((payment, index) => (
          <div 
            key={payment.id}
            className={`grid grid-cols-4 gap-4 p-4 items-center ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            {/* Time Column */}
            <div className="text-sm text-gray-500 font-medium">
              {payment.time}
            </div>

            {/* Miner Column */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden">
                <img 
                  src={payment.miner.image} 
                  alt={payment.miner.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {payment.miner.name}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">{payment.miner.hashrateBefore} TH</span>
                  <FaArrowRight className="text-gray-400 text-xs" />
                  <span className="text-gray-600">{payment.miner.hashrateAfter} TH</span>
                </div>
              </div>
            </div>

            {/* Type Column */}
            <div>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors">
                <FaChartLine className="text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">
                  {payment.type}
                </span>
              </button>
            </div>

            {/* Holder Column */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 shadow-lg shadow-purple-100">
                <BsLightningCharge className="text-white" />
                <span className="text-white font-semibold">
                  {payment.holder}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPayments;