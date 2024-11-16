import React from "react";
import WorkInProgress from "../components/WorkInProgress";

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
      <WorkInProgress
        alt="Settings Work in Progress"
        src="https://via.placeholder.com/400x300?text=Settings+Coming+Soon"
      />
    </div>
  );
};

export default Settings;
