import React from "react";

export default function Spinner() {
  return (
    <div className="bg-black bg-opacity-10 z-50 flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 z-">
      <div className="flex  gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
}
