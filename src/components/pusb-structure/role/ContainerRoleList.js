import React from "react";
import PropTypes from "prop-types";
import { FiPlus } from "react-icons/fi";
import RoleList from "./RoleList";

const ContainerRoleList = ({ token }) => {
  return (
    <>
      <h2 className="text-3xl font-semibold pt-2 pb-4">Role List</h2>
      <div className="w-full flex justify-end mb-6">
        <a href="/pusb-structure/create/minister">
          <button
            className="flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white text-sm font-medium hover:bg-blue-600 transition"
          >
            <FiPlus className="h-5 w-5 mr-2" />
            New
          </button>
        </a>
      </div>

      <RoleList token={token} />
    </>
  );
};

ContainerRoleList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ContainerRoleList;
