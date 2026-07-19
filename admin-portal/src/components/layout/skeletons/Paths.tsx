import React from "react";

function LoadingPath() {
  return (
<div className="animate-pulse space-y-4 p-4 max-w-sm rounded-lg border border-gray-200 shadow-sm">
  <div className="flex items-center space-x-4">
    <div className="h-12 w-12 rounded-full bg-gray-300"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>

  <div className="h-40 bg-gray-300 rounded-md"></div>

  <div className="space-y-2">
    <div className="h-3 bg-gray-300 rounded w-full"></div>
    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
    <div className="h-3 bg-gray-300 rounded w-4/6"></div>
  </div>
</div>
  );
}

export default LoadingPath;
