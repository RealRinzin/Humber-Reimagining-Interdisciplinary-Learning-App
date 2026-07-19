import React from "react";

function SkeletonCard() {
  return (
    <div className="animate-pulse flex flex-col space-y-3">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>
  );
}

export default SkeletonCard;
