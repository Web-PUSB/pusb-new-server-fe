import React, { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Loader from "../shared/Loader";

const ContainerEventStatus = ({ event, token }) => {
  const [loading, setLoading] = useState(null);

  const handleUpdateStatus = async (status) => {
    const confirmResult = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to update event status to ${status}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, update to ${status}!`,
      cancelButtonText: "Cancel",
    });

    if (confirmResult.isConfirmed) {
      setLoading(event.id);

      try {
        const response = await fetch(`/api/pusb-events/${event.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        });

        if (response.ok) {
          Swal.fire({
            title: "Success",
            text: `Event status updated to ${status} successfully`,
            icon: "success",
            timer: 3000,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
          });

          event.status = status;
        } else {
          throw new Error("Failed to update status");
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `Failed to update event status to ${status}`,
          icon: "error",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
        console.error(error);
      } finally {
        setLoading(null);
      }
    }
  };

  return (
    <div className="flex items-center">
      {loading === event.id ? (
        <Loader />
      ) : (
        <div className="relative">
          <button className="px-3 py-1 bg-gray-200 rounded">
            {event.status}
          </button>
          <div className="absolute mt-2 bg-white shadow-md rounded">
            <button
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => handleUpdateStatus("SOON")}
            >
              Soon
            </button>
            <button
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => handleUpdateStatus("COMPLETE")}
            >
              Complete
            </button>
            <button
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => handleUpdateStatus("PRESENT")}
            >
              Present
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ContainerEventStatus.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired, 
    status: PropTypes.oneOf(["SOON", "COMPLETE", "PRESENT"]).isRequired, 
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
};

export default ContainerEventStatus;
