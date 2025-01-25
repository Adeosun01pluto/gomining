import React from 'react'
import { FaTwitter } from "react-icons/fa";   // Twitter icon
import { FaLinkedin } from "react-icons/fa";  // LinkedIn icon
import { FaDiscord } from "react-icons/fa";   // Discord icon
import { FaTelegram } from "react-icons/fa";  // Telegram icon

function Footer() {
  return (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <img src="/api/placeholder/120/40" alt="GoMining Logo" className="mb-4" />
          <div className="flex gap-4 mb-4">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
              <img src="/api/placeholder/120/40" alt="Get it on Google Play" />
            </a>
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
              <img src="/api/placeholder/120/40" alt="Download on App Store" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">English</span>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4">ABOUT</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">GoMining</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Tokenomics</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Service providers</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Blog & News</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contacts</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">PRODUCTS</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Digital miners</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Token</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Game</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Launchpad</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">HELP</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Customer help</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Partner program</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Employee check</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © 2025 GoMining All rights reserved
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaTelegram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaDiscord size={20} /></a>
          </div>
          <div className="flex gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy policy</a>
            <a href="#" className="hover:text-white">Terms of use</a>
            <a href="#" className="hover:text-white">Cookie policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>

)
}

export default Footer