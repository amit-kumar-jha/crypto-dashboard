import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="visible sm:block sm:hidden bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">CryptoDash</div>
        {/* Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-2xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          <AiOutlineMenu />
        </button>
      </div>
      {menuOpen && (
        <div className="bg-gray-700 mt-2 rounded-lg shadow-lg py-2 absolute top-14 right-4 w-48">
          <ul className="flex flex-col">
            <li className="px-4 py-2 hover:bg-gray-600">
              <a href="/" className="block text-sm">
                Dashboard
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-600">
              <a href="/analytics" className="block text-sm">
                Analytics
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-600">
              <a href="/settings" className="block text-sm">
                Settings
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default MobileHeader;
