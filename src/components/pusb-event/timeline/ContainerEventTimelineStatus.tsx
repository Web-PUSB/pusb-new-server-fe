"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Loader from "../../shared/Loader";
import {
  ActivatePUSBEventTimeline,
  DeactivatePUSBEventTimeline,
} from "@/src/pages/api/pusb-events";
import { EventTimeline } from "@/src/types/pusb-event-type";

const ContainerEventTimelineStatus = ({
  eventId,
  eventTimeline,
}: {
  eventId: string;
  eventTimeline: EventTimeline;
}) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken || "";
  const [loading, setLoading] = useState<string | null>(null);

  const handleToggleStatus = async (eventTimeline: EventTimeline) => {
    const isCurrentlyActive = eventTimeline.status;

    // Show confirmation dialog
    const confirmResult = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${isCurrentlyActive ? "deactivate" : "activate"} this CNC.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${isCurrentlyActive ? "deactivate" : "activate"} it!`,
      cancelButtonText: "Cancel",
    });

    // If user confirms, proceed with the request
    if (confirmResult.isConfirmed) {
      const formData = new FormData();
      formData.append("status", isCurrentlyActive ? "inactive" : "active");

      setLoading(eventTimeline.id);

      try {
        let response;
        if (isCurrentlyActive) {
          response = await DeactivatePUSBEventTimeline(
            token,
            eventId,
            eventTimeline.id,
          );
        } else {
          response = await ActivatePUSBEventTimeline(
            token,
            eventId,
            eventTimeline.id,
          );
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

          eventTimeline.status = !isCurrentlyActive;
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
      {loading === eventTimeline.id ? (
        <Loader />
      ) : (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={eventTimeline.status} // Bind status to checkbox
            onChange={() => handleToggleStatus(eventTimeline)}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {eventTimeline.status ? "Deactivate" : "Activate"}
          </span>
        </label>
      )}
    </div>
  );
};

export default ContainerEventTimelineStatus;
