import React from "react";
import WorkInProgress from "../components/WorkInProgress";

const Analytics = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center min-h-[105vh]">
      <h1 className="text-4xl font-bold text-gray-800">Analytics</h1>
      <WorkInProgress
        alt="Analytics Work in Progress"
        src="https://via.placeholder.com/400x300?text=Analytics+Coming+Soon"
      />
    </div>
  );
};

export default Analytics;
