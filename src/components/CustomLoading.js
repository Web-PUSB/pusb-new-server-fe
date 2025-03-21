import React from "react";

const CustomLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className="text-3xl font-bold text-gray-800">ADMIN</p>
      <div className="loader">
        <span>P</span>
        <span>U</span>
        <span>S</span>
        <span>B</span>
      </div>
    </div>
  );
};

export default CustomLoading;
