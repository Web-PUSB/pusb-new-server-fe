"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { WorkplanCNC } from "@/src/types/pusb-cnc-type";
import { GetPUSBCNCWorkplanById } from "../../../pages/api/pusb-cnc";
import { formatTime } from "@/src/utils/FormatTime";

const CnCWorkplanModal = ({
  cncId,
  WorkplanId,
}: {
  cncId: string;
  WorkplanId: string;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [Workplan, setWorkplan] = useState<WorkplanCNC>();
  useEffect(() => {
    const fetchData = async (cncId: string, WorkplanId: string) => {
      try {
        const data = await GetPUSBCNCWorkplanById(cncId, WorkplanId);
        setWorkplan(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (cncId && WorkplanId) {
      fetchData(cncId, WorkplanId);
    }
  }, [cncId, WorkplanId]);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
      >
        Views
      </button>
      <Modal
        dismissible
        show={openModal}
        onClose={handleOpenModal}
        size={`2xl`}
      >
        {Workplan && (
          <>
            <Modal.Header>
              <div>
                <h2 className="font-semikbold text-gray-800 dark:text-white ">
                  {Workplan.title}
                </h2>
                <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                  {formatTime(Workplan.date_parse)} - {Workplan.duration}
                </p>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {Workplan.description}
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button color="gray" onClick={handleOpenModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default CnCWorkplanModal;
