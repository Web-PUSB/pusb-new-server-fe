import React from "react"; 
import { FiPlus } from "react-icons/fi";
import MemberList from "./MemberList";

const ContainerMemberList = ({ isMinister }) => {
  return (
    <>
      <h2 className="text-3xl font-semibold pt-2 pb-4">Member List</h2>
      <div className="w-full flex justify-end mb-6">
        {isMinister ? (
          <a href="teammember/create">
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              <FiPlus className="h-5 w-5 mr-2" />
              New
            </button>
          </a>
        ) : (
          <a href="pusb-structure/create/member">
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              <FiPlus className="h-5 w-5 mr-2" />
              New
            </button>
          </a>
        )}
      </div>
      <MemberList isMinister={isMinister} />
    </>
  );
};

export default ContainerMemberList;
