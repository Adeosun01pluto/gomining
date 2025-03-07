import React from 'react';
import { FaTelegram, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Join = () => {
  const socialLinks = [
    {
      name: 'Telegram',
      icon: FaTelegram,
      href: 'https://t.me/gomining_official',
      color: 'hover:bg-[#229ED9]'
    },
    {
      name: 'X (Twitter)',
      icon: FaXTwitter,
      href: 'https://twitter.com/gomining_eng',
      color: 'hover:bg-black'
    },
    {
      name: 'Discord',
      icon: FaDiscord,
      href: 'https://discord.gg/gomining',
      color: 'hover:bg-[#5865F2]'
    }
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gray-100 rounded-3xl p-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black">
              Join the GoMining community
            </h2>
            <p className="text-black/60 text-sm sm:text-base md:text-lg font-semibold">
              There you'll find giveaways, insights on updates and secrets on how to earn even more via mobile bitcoin mining.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200 
                    hover:border-transparent hover:text-white transition-all duration-200 
                    ${social.color} group`}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="font-semibold">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - 3D Icons */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
            {/* Purple Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
            
            {/* 3D Social Icons */}
            <div className="relative h-full">
              {socialLinks.map((social, index) => (
                <div
                  key={index}
                  className={`absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full 
                    bg-gradient-to-br from-purple-600 to-purple-400
                    shadow-xl backdrop-blur-xl
                    transform transition-transform duration-500 hover:scale-110
                    flex items-center justify-center
                    ${index === 0 ? 'top-[20%] left-[20%]' : ''}
                    ${index === 1 ? 'top-[40%] left-[40%]' : ''}
                    ${index === 2 ? 'top-[60%] left-[30%]' : ''}`}
                  style={{
                    transform: `translateZ(${index * 20}px)`,
                    zIndex: index
                  }}
                >
                  <social.icon className="w-12 h-12 sm:w-16 sm:h-16 text-white/90" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;