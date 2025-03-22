import React from "react";
import PropTypes from "prop-types";

const AccessRestricted = ({ handleLogout }) => {
  return (
    <div className="w-full flex justify-center items-center h-80">
      <div className="text-center">
        <p className="text-lg font-semibold">Restricted Access</p>
        <p className="mt-2">
          You do not have the required permissions to access this page. Only
          Super Admins can view this section. Please{" "}
          <button
            onClick={handleLogout}
            className="text-blue-600 hover:underline"
          >
            log out
          </button>
          <span className="ml-1">
            with the appropriate credentials to proceed, or return to the{" "}
          </span>
          <a href="/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </a>
          .
        </p>
      </div>
    </div>
  );
};

AccessRestricted.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default AccessRestricted;
