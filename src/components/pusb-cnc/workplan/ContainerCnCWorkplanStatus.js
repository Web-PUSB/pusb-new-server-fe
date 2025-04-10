import React, { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Loader from "../../shared/Loader";
import {
  ActivatePUSBCNCWorkplan,
  DeactivatePUSBCNCWorkplan,
} from "../../../pages/api/pusb-cnc";

const ContainerCnCWorkplanStatus = ({ workplan, cncId }) => {
  const [loading, setLoading] = useState(null);
  const [status, setStatus] = useState(workplan.status);

  const handleToggleStatus = async () => {
    const isCurrentlyActive = status;

    const confirmResult = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${isCurrentlyActive ? "deactivate" : "activate"} this Workplan.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${isCurrentlyActive ? "deactivate" : "activate"} it!`,
      cancelButtonText: "Cancel",
    });

    if (confirmResult.isConfirmed) {
      setLoading(workplan.id);

      try {
        let response;
        if (isCurrentlyActive) {
          response = await DeactivatePUSBCNCWorkplan(cncId, workplan.id);
        } else {
          response = await ActivatePUSBCNCWorkplan(cncId, workplan.id);
        }

        if (response) {
          Swal.fire({
            title: "Success",
            text: `CNC ${isCurrentlyActive ? "deactivated" : "activated"} successfully`,
            icon: "success",
            timer: 3000,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
          });

          setStatus(!isCurrentlyActive);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `Failed to ${isCurrentlyActive ? "deactivate" : "activate"} CNC`,
          icon: "error",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
        console.log(error);
      } finally {
        setLoading(null);
      }
    }
  };

  return (
    <div className="flex items-center h-full">
      {loading === workplan.id ? (
        <Loader />
      ) : (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={status}
            onChange={handleToggleStatus}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {status ? "Deactivate" : "Activate"}
          </span>
        </label>
      )}
    </div>
  );
};

ContainerCnCWorkplanStatus.propTypes = {
  cncId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  workplan: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  }).isRequired,
};

export default ContainerCnCWorkplanStatus;
