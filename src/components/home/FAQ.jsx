import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "What is a digital miner?",
      answer: "A digital miner is a virtual representation of real mining hardware that allows you to earn Bitcoin rewards without managing physical equipment. It harnesses the power of our verified data centers while you control your mining operations from your phone or computer."
    },
    {
      question: "How do I start earning Bitcoin rewards?",
      answer: "Starting is simple: 1) Purchase a digital miner from our marketplace 2) Connect your Bitcoin wallet 3) Start receiving daily BTC rewards directly to your wallet. No technical knowledge required!"
    },
    {
      question: "Are there any maintenance fees?",
      answer: "Yes, there is a small maintenance fee to cover electricity and hosting costs. This fee is automatically deducted from your mining rewards, so you'll always receive your net earnings directly to your wallet."
    },
    {
      question: "How often do I receive rewards?",
      answer: "Bitcoin mining rewards are distributed daily to your connected wallet. The exact amount varies based on your digital miner's computing power, network difficulty, and Bitcoin's current price."
    },
    {
      question: "Can I sell my digital miner?",
      answer: "Yes! You can sell your digital miner anytime through our marketplace. Each miner is a unique digital asset that you fully own and can transfer to other users."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Title and Description */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black">
            Frequently Asked Questions
          </h2>
          <p className="text-black/60 text-sm sm:text-base md:text-lg font-semibold">
            Here are quick answers to the most common questions.
          </p>
          <a 
            href="/faq"
            className="text-purple-600 hover:text-purple-700 font-semibold text-sm sm:text-base inline-block"
          >
            Need more details? Explore our FAQ page
          </a>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-4 sm:p-6 text-left bg-white hover:bg-gray-50"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-semibold text-sm sm:text-base text-black">
                  {item.question}
                </span>
                <div className={`w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''}`}>
                  <FaChevronDown className="w-3 h-3 text-white" />
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-200 ${
                  activeIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="p-4 sm:p-6 pt-0 text-sm sm:text-base text-gray-600">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;