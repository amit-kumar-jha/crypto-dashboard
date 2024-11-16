import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./Header";
import { useDarkMode } from "../lib/DarkModeProvider";

const Layout = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const toggleSidebar = () => setIsMinimized(!isMinimized);

  return (
    <div className="flex">
      <MobileHeader />
      <Sidebar
        toggleSidebar={toggleSidebar}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
      />
      <div
        className={`flex-1 transition-all duration-300 pt-[64px] md:pt-[0px]`}
      >
        <div className={`${isDarkMode && "bg-gray-900"} p-4`}>{children}</div>
      </div>
      <button
        onClick={toggleDarkMode}
        className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-gray-100 text-black hover:bg-gray-200"
        }`}
        title="Toggle Dark Mode"
      >
        {isDarkMode ? "🌙" : "☀️"}
      </button>
    </div>
  );
};

export default Layout;
