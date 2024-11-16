import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./Header";

const Layout = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => setIsMinimized(!isMinimized);
  return (
    <div className="flex">
      {/* Sidebar */}
      <MobileHeader />
      <Sidebar
        toggleSidebar={toggleSidebar}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 pt-[64px] md:pt-[0px]`}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
