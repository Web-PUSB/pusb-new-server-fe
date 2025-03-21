import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";

const CnCWorkplanModal = ({ cncId, WorkplanId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [workplan, setWorkplan] = useState(null);

  useEffect(() => {
    const fetchData = async (cncId, workplanId) => {
      try {
        const response = await fetch(`/api/pusb-cnc/${cncId}/${workplanId}`);
        const data = await response.json();
        setWorkplan(data);
      } catch (error) {
        console.error("Failed to fetch workplan:", error);
      }
    };

    if (cncId && WorkplanId) {
      fetchData(cncId, WorkplanId);
    }
  }, [cncId, WorkplanId]);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
      >
        View
      </button>
      <Modal dismissible show={openModal} onClose={handleOpenModal} size="2xl">
        {workplan && (
          <>
            <Modal.Header>
              <div>
                <h2 className="font-semibold text-gray-800 dark:text-white">
                  {workplan.title}
                </h2>
                <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                  {formatTime(workplan.date_parse)} - {workplan.duration}
                </p>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {workplan.description}
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
