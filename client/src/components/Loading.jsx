import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex space-x-1">
        <div className="w-5 h-18 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
        <div className="w-5 h-18 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-5 h-18 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-5 h-18 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.15s]"></div>
        <div className="w-5 h-18 bg-fuchsia-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
      </div>
    </div>
  );
}

export default Loading;
