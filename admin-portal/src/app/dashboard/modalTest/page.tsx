import React from "react";

export default function ChildPrp({ onRefresh }: { onRefresh: () => void }) {
  const handleRefresh = async () => {
    onRefresh(); 
  };
  return (
    <div>
      <button onClick={handleRefresh} className="bg-gray-300 py-2 px-4 rounded-md">Refresh</button>
    </div>
  );
}
