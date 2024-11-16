import React from "react";

const WorkInProgress = ({ alt, src }) => {
  return (
    <div>
      <p className="mt-4 text-gray-600">
        This feature is{" "}
        <span className="text-blue-500 font-semibold">Work in Progress</span>.
      </p>
      <img src={src} alt={alt} className="mt-6 max-w-full h-auto" />
    </div>
  );
};

export default WorkInProgress;
