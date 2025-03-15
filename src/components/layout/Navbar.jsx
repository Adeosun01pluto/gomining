import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { a } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaGlobe, FaExternalLinkAlt, FaComments } from 'react-icons/fa';
import { BiDownArrow } from 'react-icons/bi';
import { IoCalculator } from 'react-icons/io5';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import gominingLogo from '../../assets/gomininglogo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [price] = useState({ value: 0.4170, change: -4.01 });
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const auth = getAuth();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  // Handle scroll effect
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Check if current route is dashboard
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  // If we're on a dashboard route, don't render the navbar
  if (isDashboardRoute) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  // Handle menu open
  const handleMenuOpen = () => {
    console.log('Opening menu, current state:', isOpen);
    setIsOpen(true);
    console.log('Menu should now be open');
  };

  // Handle menu close
  const handleMenuClose = () => {
    console.log('Closing menu, current state:', isOpen);
    setIsOpen(false);
    console.log('Menu should now be closed');
  };

  // Handle menu toggle
  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle menu item click
  const handleMenuItemClick = (path) => {
    console.log('Menu item clicked:', path);
    handleMenuClose();
  };

  const navSections = {
    company: {
      title: 'Company',
      items: [
        { name: 'About GoMining', path: '/' },
        { name: 'Service Providers', path: '/' },
        { name: 'Careers', path: '/' },
        { name: 'Contacts', path: '/' },
        { name: 'Referral Program', path: '/' },
      ]
    },
    learn: {
      title: 'Learn',
      items: [
        { name: 'Blog & News', path: '/' },
        { name: 'Customer Help', path: '/' },
        { name: 'Launchpad', path: '/' },
        { name: 'Calculator', path: '/', icon: IoCalculator },
        { name: 'Hosting', path: '/', external: true },
      ]
    },
    miners: {
      title: 'Digital Miners',
      items: [
        { name: 'How it Works', path: '/' },
        { name: 'Reward Calculator', path: '/dashboard/rewards' },
        { name: 'Collections', path: '/' },
        { name: 'Avatars', path: '/' },
      ]
    },
    token: {
      title: 'Token',
      items: [
        { name: 'About Token', path: '/' },
        { name: 'Tokenomics', path: '/' },
      ]
    }
  };

  const mainNavItems = [
    { name: 'Digital miners', path: '/' },
    { name: 'Token', path: '/' },
    { name: 'Game', path: '/' },
    { name: 'Launchpad', path: '/' },
    { name: 'Company', path: '/' },
    { name: 'Learn', path: '/' },
    { name: 'Hosting', path: '/', external: true },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[999] transition-all duration-300 ${
        scrolled ? 'bg-[#0F0F14]/95 backdrop-blur-sm' : 'bg-[#0F0F14]'
      } border-b border-gray-800`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-3 group">
              <img src={gominingLogo} alt="" className="w-48 scale-150 ml-[-30px]  h-32 object-contain"/>
                {/* <div className="w-8 h-8 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/50 transition-all duration-300 group-hover:shadow-purple-500/70"></div> */}
                {/* <span className="text-xl font-semibold text-white">gomining</span> */}
              </a>
            </div>

            {/* Desktop Navigation - Only visible on XL screens */}
            <div className="hidden lg:flex items-center justify-end flex-1">
              <div className="flex items-center space-x-4">
                {mainNavItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.name}
                    {item.external && <FaExternalLinkAlt className="w-3 h-3" />}
                  </a>
                ))}
              </div>

              {/* Price Indicator */}
              <div className="ml-6 flex items-center space-x-1">
                <div className="flex items-center bg-gray-800/50 rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-white text-sm font-medium">${price.value}</span>
                  <span className={`ml-2 text-xs ${price.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {price.change}%
                  </span>
                </div>
              </div>

              {/* Update the Auth & Language section in desktop navigation */}
              <div className="ml-6 flex items-center space-x-4">
                {user ? (
                  <>
                    <span className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full">
                      {(user.displayName || user.email)[0].toUpperCase()}
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-white px-3 py-2 text-sm transition-colors"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <a 
                      href="/login"
                      className="text-gray-300 hover:text-white px-3 py-2 text-sm transition-colors"
                    >
                      Log in
                    </a>
                    <a 
                      href="/signup"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
                    >
                      Sign up
                    </a>
                  </>
                )}
                <button className="text-gray-300 hover:text-white px-3 py-2 flex items-center gap-1 text-sm transition-colors">
                  <FaGlobe className="w-4 h-4" />
                  EN
                  <BiDownArrow className="w-3 h-3" />
                </button>
              </div>

            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center space-x-4">
              {/* Price Indicator - Visible on MD+ */}
              <div className="hidden md:flex items-center">
                <div className="flex items-center bg-gray-800/50 rounded-lg px-2 py-1.5">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1.5 animate-pulse"></div>
                  <span className="text-white text-xs font-medium">${price.value}</span>
                  <span className={`ml-1.5 text-[10px] ${price.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {price.change}%
                  </span>
                </div>
              </div>

               {/* Update the mobile auth buttons section */}
                <div className="hidden md:flex items-center space-x-3">
                  {user ? (
                    <>
                      <span className="text-gray-300 text-sm truncate max-w-[100px]">
                        {user.displayName || user.email}
                      </span>
                      <button 
                        onClick={handleLogout}
                        className="text-gray-300 hover:text-white px-2 py-1.5 text-sm"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <a 
                        href="/login"
                        className="text-gray-300 hover:text-white px-2 py-1.5 text-sm"
                      >
                        Log in
                      </a>
                      <a 
                        href="/signup"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
                      >
                        Sign up
                      </a>
                    </>
                  )}
                </div>

              {/* Menu Button */}
              <button
                onClick={handleMenuToggle}
                className="text-gray-300 hover:text-white p-2 cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div 
          className={`fixed inset-0 bg-black backdrop-blur-sm transition-opacity duration-300 z-[9998] ${
            isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={handleMenuClose}
        />

        {/* Mobile Navigation Sidebar */}
        <div 
          className={`fixed top-0 right-0 w-4/5 max-w-[320px] h-full bg-[#0F0F14] transition-transform duration-300 ease-in-out z-[9999] ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } overflow-y-auto shadow-xl`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="sticky top-0 bg-[#0F0F14] flex items-center justify-end p-4 border-b border-gray-800">
              {/* <span className="text-white font-medium">Menu</span> */}
              <button
                onClick={handleMenuClose}
                className="text-gray-300 hover:text-white p-2 text-right"
                aria-label="Close menu"
              >
                <HiX size={24} />
              </button>
            </div>

            {/* Mobile Menu Sections */}
            <div className="flex-1">
              {Object.values(navSections).map((section) => (
                <div key={section.title} className="py-4 px-4 border-b border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">{section.title}</h3>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <a
                        key={item.name}
                        href={item.path}
                        className="flex items-center justify-between py-2 px-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors"
                        onClick={() => handleMenuItemClick(item.path)}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        <span className="flex items-center gap-2">
                          {item.icon && <item.icon className="w-4 h-4" />}
                          {item.name}
                        </span>
                        {item.external && <FaExternalLinkAlt className="w-3.5 h-3.5" />}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Update the Mobile Menu Footer */}
            <div className="sticky bottom-0 bg-[#0F0F14] p-4 border-t border-gray-800">
              <div className="flex flex-col gap-3">
                {user ? (
                  <>
                    <span className="text-center text-gray-300 text-sm">
                      Signed in as {user.displayName || user.email}
                    </span>
                    <button 
                      onClick={() => {
                        handleLogout();
                        handleMenuClose();
                      }}
                      className="w-full text-gray-300 hover:text-white px-4 py-2 rounded-md border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <a 
                      href="/signup"
                      onClick={handleMenuClose}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors text-center"
                    >
                      Sign up
                    </a>
                    <a 
                      href="/login"
                      onClick={handleMenuClose}
                      className="w-full text-gray-300 hover:text-white px-4 py-2 rounded-md border border-gray-700 hover:border-gray-600 transition-colors text-center"
                    >
                      Log in
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Chat Button */}
      <a
        href="https://t.me/your_telegram_channel"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center shadow-lg transition-colors z-[998]"
        aria-label="Open chat"
      >
        <FaComments className="w-6 h-6 text-white" />
      </a>
    </>
  );
};

export default Navbar;