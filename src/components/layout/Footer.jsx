import React from 'react';
import { FaTwitter, FaLinkedin, FaDiscord, FaTelegram, FaGlobe, FaMedium, FaGooglePlay, FaApple, FaLanguage, FaComments } from 'react-icons/fa';
import gominingLogo from '../../assets/gomininglogo.png';

const Footer = () => {
  const navigationLinks = {
    about: {
      title: 'ABOUT',
      links: [
        { name: 'GoMining', href: '/about' },
        { name: 'Tokenomics', href: '/tokenomics' },
        { name: 'Service providers', href: '/providers' },
        { name: 'Blog & News', href: '/news' },
        { name: 'Contacts', href: '/contacts' }
      ]
    },
    products: {
      title: 'PRODUCTS',
      links: [
        { name: 'Digital miners', href: '/miners' },
        { name: 'Avatars', href: '/avatars' },
        { name: 'Collections', href: '/collections' },
        { name: 'Token', href: '/token' },
        { name: 'Game', href: '/game' },
        { name: 'Launchpad', href: '/launchpad' }
      ]
    },
    partners: {
      title: 'FOR PARTNERS',
      links: [
        { name: 'Partner program', href: '/partner-program' },
        { name: 'Referral program', href: '/referral' },
        { name: 'Hosting', href: '/hosting' }
      ]
    },
    help: {
      title: 'HELP',
      links: [
        { name: 'Customer help', href: '/help' },
        { name: 'Employee check', href: '/employee-check' }
      ]
    }
  };

  const socialLinks = [
    { icon: FaGlobe, href: 'https://gomining.com', label: 'Website' },
    { icon: FaMedium, href: 'https://medium.com/gomining', label: 'Medium' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/gomining', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/gomining_eng', label: 'Twitter' },
    { icon: FaTelegram, href: 'https://t.me/gomining_official', label: 'Telegram' },
    { icon: FaDiscord, href: 'https://discord.gg/gomining', label: 'Discord' }
  ];

  const policyLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Compliance Policy', href: '/compliance' },
    { name: 'Token White Paper', href: '/token-whitepaper' },
    { name: 'Digital Miners White Paper', href: '/miners-whitepaper' },
    { name: 'Cookie Policy', href: '/cookies' }
  ];

  return (
    <footer className="relative bg-[#0F0F14] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Logo & App Downloads */}
          <div className="space-y-6 col-span-2">
            <div className="flex items-center gap-2">
              <img src={gominingLogo} alt="" className="w-48 scale-150 object-contain"/>

              {/* <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold">GoMining</span> */}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.gomining"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-black rounded-lg hover:bg-gray-900 transition-colors"
              >
                <FaGooglePlay className="w-6 h-6" />
                <div className="text-xs">
                  <div>GET IT ON</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </a>
              
              <a
                href="https://apps.apple.com/app/gomining"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-black rounded-lg hover:bg-gray-900 transition-colors"
              >
                <FaApple className="w-6 h-6" />
                <div className="text-xs">
                  <div>Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer">
              <FaLanguage className="w-5 h-5" />
              <span className="text-sm">English</span>
            </div>
          </div>

          {/* Navigation Links */}
          {Object.values(navigationLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-sm tracking-wider mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          {/* Policy Links */}
          <div className="text-center text-xs text-gray-400 space-y-4">
            <p>© {new Date().getFullYear()} GoMining. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {policyLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              <p>
                YUCCA DIGITAL (Latvian Limited liability company (SIA)), Rīga, Elizabetes iela 22 - 42, LV-1050, registered on 08.10.2021, registration number: 40203351911
              </p>
              <p>
                GoMining (BVI) Limited, Trinity Chambers, PO Box 4301, Road Town, Tortola, British Virgin Islands, BVI company number: 2110978
              </p>
              <p>
                BMINE BVI LIMITED, Trinity Chambers, Road Town, Tortola, British Virgin Islands VG 1110
              </p>
              <p className="text-justify">
                GoMining (British Virgin Islands) Limited, SIA Yucca Digital and BMINE BVI LIMITED operate in full compliance with all applicable laws and regulations and are firmly committed to combating money laundering, terrorist financing and proliferation financing. We adhere to the highest standards, ensuring strict compliance with all relevant anti-money laundering and terrorist financing obligations, as well as anti-proliferation financing measures, to maintain the integrity and security of our operations and services.
              </p>
              <p className="text-justify">
                The content presented on this website is not an offer or recommendation for investment. The data presented here may contain approximate figures and should not be used as a basis for making investment decisions. In this regard, before using our services, you are advised to independently assess the risks associated with our products and services. By accessing and using this website and our services, you agree to comply with our Terms of Use and Privacy Policy. If you have any questions, please don't hesitate to contact us.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center shadow-lg transition-colors"
        aria-label="Open chat"
      >
        <FaComments className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer;
