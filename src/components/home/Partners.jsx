// components/home/Partners.jsx
import React from "react";
import b1 from "../../assets/binance-pool.svg"; // Example SVG
import coindesk from "../../assets/bitcoin-mining-council.svg"; // Add more SVG imports as needed
import nasdaq from "../../assets/bitfinex.svg";
import forbes from "../../assets/bitmain.svg";
import bitcoin from "../../assets/bitscale.svg";
import cointelegraph from "../../assets/bitmart_002.svg";

const Partners = () => {
  // Array of partner SVGs
  const partners = [
    { name: "CoinDesk", logo: coindesk },
    { name: "Nasdaq", logo: nasdaq },
    { name: "Forbes", logo: forbes },
    { name: "Bitcoin.com", logo: bitcoin },
    { name: "CoinTelegraph", logo: cointelegraph },
  ];

  return (
    <section className="py-4 px-4 sm:px-6 lg:px-8 bg-[#0B0B1A]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-6 sm:gap-8 items-center justify-center sm:justify-evenly py-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-[120px] sm:w-[150px]"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="w-full h-auto object-contain max-h-12 sm:max-h-16"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
