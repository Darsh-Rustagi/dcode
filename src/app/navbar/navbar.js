'use client';

import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // A simple SVG icon to act as a logo for the brand
  const BrandIcon = () => (
    <svg className="h-8 w-auto text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.92M9 21a6 6 0 01-6-6v-1a6 6 0 016-6v12z" />
    </svg>
  );

  return (
    <nav className="bg-black shadow-xl fixed w-full top-0 z-50 border-b border-amber-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Brand/Name with Icon */}
          <div className="flex items-center space-x-3">
            
            <a href="/" className="text-amber-400 text-2xl font-bold tracking-wider hidden sm:block">
              Mentora
            </a>
          </div>

          {/* Center Section: Navigation Links (hidden on mobile) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/about" className="text-gray-400 hover:text-amber-400  px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
              <a href="/mentors" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
                Mentors
              </a>
              <a href="/pricing" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
                Pricing
              </a>
              <a href="/contact" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </a>
            </div>
          </div>

          {/* Right Section: Login Button (hidden on mobile) */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black hover:from-amber-600 hover:to-yellow-700 px-4 py-2 rounded-md text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/10">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-amber-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-amber-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu, show/hide with a smooth transition */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black">
          <a href="/about" className="text-amber-400 block px-3 py-2 rounded-md text-base font-medium">
            About
          </a>
          <a href="/mentors" className="text-gray-400 hover:bg-gray-800 hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium">
            Mentors
          </a>
          <a href="/services" className="text-gray-400 hover:bg-gray-800 hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium">
            Services
          </a>
          <a href="/contact" className="text-gray-400 hover:bg-gray-800 hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium">
            Contact
          </a>
        </div>
        <div className="px-2 py-3 bg-black">
          <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black hover:from-amber-600 hover:to-yellow-700 px-4 py-2 rounded-md text-base font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


