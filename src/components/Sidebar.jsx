import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlinePieChart,
  AiOutlineSetting,
} from "react-icons/ai";
import { useDarkMode } from "../lib/DarkModeProvider";

const Sidebar = ({ isMinimized, toggleSidebar }) => {
  const location = useLocation();
  const { isDarkMode } = useDarkMode();

  const menuItems = [
    { name: "Dashboard", icon: <AiOutlineDashboard />, path: "/" },
    { name: "Analytics", icon: <AiOutlinePieChart />, path: "/analytics" },
    { name: "Settings", icon: <AiOutlineSetting />, path: "/settings" },
  ];

  return (
    <div
      className={`min-h-[105vh] ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-800 text-gray-100"
      } ${
        isMinimized ? "w-16" : "w-64"
      } transition-all duration-300 fixed sm:static sm:block hidden`}
    >
      <div
        className={`flex items-center justify-between p-4 ${
          isDarkMode ? "border-b border-gray-700" : "border-b border-gray-600"
        }`}
      >
        {!isMinimized ? (
          <h1 className="text-xl font-bold">CryptoDash</h1>
        ) : (
          <h1 className="text-2xl font-bold text-gray-300">C</h1>
        )}

        <button
          onClick={toggleSidebar}
          className={`text-gray-300 hover:text-white focus:outline-none ${
            isDarkMode ? "hover:text-gray-400" : "hover:text-gray-200"
          }`}
        >
          {isMinimized ? ">" : "<"}
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {menuItems.map((item) => (
          <li key={item.name} className="group relative">
            <Link
              to={item.path}
              className={`flex items-center p-2 rounded-md ${
                location.pathname === item.path
                  ? isDarkMode
                    ? "bg-gray-700"
                    : "bg-gray-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!isMinimized && <span className="ml-4">{item.name}</span>}
            </Link>
            {isMinimized && (
              <div
                className={`absolute left-16 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded-md shadow-md text-sm ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-700 text-gray-100"
                } opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-200`}
              >
                {item.name}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
