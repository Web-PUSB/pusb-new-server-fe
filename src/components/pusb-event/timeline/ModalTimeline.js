import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const ModalTimeline = ({ timelineId, timeline }) => {
  console.log(timelineId);
  
  const [openModal, setOpenModal] = useState(false);
  
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
        size="2xl"
      >
        <Modal.Header>{timeline.title}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {timeline.description}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={handleOpenModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalTimeline;
