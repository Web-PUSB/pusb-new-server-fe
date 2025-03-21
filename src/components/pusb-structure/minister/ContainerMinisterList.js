import React from "react";
import { FiPlus } from "react-icons/fi";
import MinisterList from "./MinisterList";
import { useNavigate } from "react-router-dom";

const ContainerMinisterList = ({ token }) => {
  const navigate = useNavigate();

  const handleNewClick = () => {
    navigate("/pusb-structure/create/minister");
  };

  return (
    <>
      <h2 className="text-3xl font-semibold pt-2 pb-4">Minister List</h2>
      <div className="w-full flex justify-end mb-6">
        <button
          onClick={handleNewClick}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <FiPlus className="h-5 w-5 mr-2" />
          New
        </button>
      </div>

      <MinisterList token={token} />
    </>
  );
};

export default ContainerMinisterList;
