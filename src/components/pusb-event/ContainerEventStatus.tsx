"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Loader from "../shared/Loader";
import { Dropdown } from "flowbite-react";
import { UpdateStatusPUSBEvent } from "@/src/pages/api/pusb-events";
import { Events } from "@/src/types/pusb-event-type";

const ContainerEventStatus = ({ event }: { event: Events }) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken || "";
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpdateStatus = async (status: string) => {
    const confirmResult = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to event status updated to ${status}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, event status updated to ${status} it!`,
      cancelButtonText: "Cancel",
    });

    // If user confirms, proceed with the request
    if (confirmResult.isConfirmed) {
      setLoading(event.id); // Start loading when API call begins

      try {
        const response = await UpdateStatusPUSBEvent(status, token, event.id);
        if (response) {
          Swal.fire({
            title: "Success",
            text: `Event status updated to ${status} successfully`,
            icon: "success",
            timer: 3000,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
          });

          // Optionally update the local event status
          event.status = status;
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
        console.log(error);
      } finally {
        setLoading(null); // Clear the loading state
      }
    }
  };

  return (
    <div className="flex items-center h- z-80 50 absolute">
      {loading === event.id ? (
        <Loader /> // Show loader during API call
      ) : (
        <Dropdown label={event.status} size="sm" inline>
          <Dropdown.Item onClick={() => handleUpdateStatus("SOON")}>
            Soon
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleUpdateStatus("COMPLETE")}>
            Complete
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleUpdateStatus("PRESENT")}>
            Present
          </Dropdown.Item>
        </Dropdown>
      )}
    </div>
  );
};

export default ContainerEventStatus;
