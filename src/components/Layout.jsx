import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => setIsMinimized(!isMinimized);
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        toggleSidebar={toggleSidebar}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300`}>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
