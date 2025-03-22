import React, { useState } from "react"; 
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Loader from "../../shared/Loader";

const ContainerWorkplanStatus = ({ cnc }) => {
  const [loading, setLoading] = useState(null);

  const handleToggleStatus = async () => {
    const isCurrentlyActive = cnc.status;

    const confirmResult = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${
        isCurrentlyActive ? "deactivate" : "activate"
      } this CNC.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${isCurrentlyActive ? "deactivate" : "activate"} it!`,
      cancelButtonText: "Cancel",
    });

    if (confirmResult.isConfirmed) {
      setLoading(cnc.id);

      try {
        // Simulate API call
        setTimeout(() => {
          cnc.status = !isCurrentlyActive;
          Swal.fire({
            title: "Success",
            text: `CNC ${
              isCurrentlyActive ? "deactivated" : "activated"
            } successfully`,
            icon: "success",
            timer: 3000,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
          });
          setLoading(null);
        }, 1000);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `Failed to ${
            isCurrentlyActive ? "deactivate" : "activate"
          } CNC`,
          icon: "error",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
        setLoading(null);
      }
    }
  };

  return (
    <div className="flex items-center h-full">
      {loading === cnc.id ? (
        <Loader />
      ) : (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={cnc.status}
            onChange={handleToggleStatus}
          />
          <div className={`relative w-11 h-6 bg-gray-200 rounded-full`}>
            <div
              className={`absolute w-5 h-5 bg-white rounded-full top-[2px] ${
                cnc.status ? "translate-x-full bg-blue-600" : ""
              } transition-all`}
            />
          </div>
          <span className="ms-3 text-sm font-medium">
            {cnc.status ? "Deactivate" : "Activate"}
          </span>
        </label>
      )}
    </div>
  );
};

ContainerWorkplanStatus.propTypes = {
  cnc: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ContainerWorkplanStatus;
