import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlinePieChart,
  AiOutlineSetting,
} from "react-icons/ai";

const Sidebar = ({ isMinimized, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <AiOutlineDashboard />, path: "/" },
    { name: "Analytics", icon: <AiOutlinePieChart />, path: "/analytics" },
    { name: "Settings", icon: <AiOutlineSetting />, path: "/settings" },
  ];

  return (
    <div
      className={`h-screen bg-gray-800 text-white ${
        isMinimized ? "w-16" : "w-64"
      } transition-all duration-300 fixed sm:static sm:block hidden`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        {!isMinimized ? (
          <h1 className="text-xl font-bold">CryptoDash</h1>
        ) : (
          <h1 className="text-2xl font-bold text-gray-300">C</h1>
        )}

        <button
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          {isMinimized ? ">" : "<"}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="mt-4 space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${
                location.pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              {!isMinimized ? (
                <span className="text-xl">{item.icon}</span>
              ) : (
                <span className="flex items-center justify-between pl-3">
                  {item.icon}
                </span>
              )}

              {!isMinimized && <span className="ml-4">{item.name}</span>}
            </Link>
            {isMinimized && (
              <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-200">
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
