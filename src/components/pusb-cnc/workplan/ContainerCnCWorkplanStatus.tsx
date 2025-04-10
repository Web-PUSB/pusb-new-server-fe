"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Loader from "../../shared/Loader";
import { Workplan } from "@/src/types/pusb-workplan.type";
import {
  ActivatePUSBCNCWorkplan,
  DeactivatePUSBCNCWorkplan,
} from "@/src/pages/api/pusb-cnc";

const ContainerCnCWorkplanStatus = ({
  Workplan,
  cncId,
}: {
  Workplan: Workplan;
  cncId: string;
}) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken || "";
  const [loading, setLoading] = useState<string | null>(null);
  const [status, setStatus] = useState<boolean>(Workplan.status); // Local status state

  const handleToggleStatus = async (Workplan: Workplan) => {
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
      setLoading(Workplan.id);

      try {
        let response;
        if (isCurrentlyActive) {
          response = await DeactivatePUSBCNCWorkplan(token, cncId, Workplan.id);
        } else {
          response = await ActivatePUSBCNCWorkplan(token, cncId, Workplan.id);
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

          // Update local status to trigger re-render
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
      {loading === Workplan.id ? (
        <Loader />
      ) : (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={status}
            onChange={() => handleToggleStatus(Workplan)}
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

export default ContainerCnCWorkplanStatus;
