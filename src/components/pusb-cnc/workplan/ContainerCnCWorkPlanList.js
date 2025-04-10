import React from "react";
import PropTypes from "prop-types";
import { Button } from "flowbite-react";
import { HiCheckCircle, HiClock, HiExclamationCircle } from "react-icons/hi";
import { activatePUSBCNCWorkplan, deactivatePUSBCNCWorkplan } from "../../../pages/api/pusb-cnc";

const ContainerCnCWorkplanStatus = ({ cncId, workplan }) => {
  const handleActivate = () => {
    activatePUSBCNCWorkplan(cncId, workplan.id);
  };

  const handleDeactivate = () => {
    deactivatePUSBCNCWorkplan(cncId, workplan.id);
  };

  return (
    <div className="flex flex-col items-center">
      {workplan.status === "active" ? (
        <>
          <HiCheckCircle className="text-green-500 w-6 h-6" />
          <Button size="xs" color="gray" onClick={handleDeactivate}>
            Deactivate
          </Button>
        </>
      ) : workplan.status === "pending" ? (
        <>
          <HiClock className="text-yellow-500 w-6 h-6" />
          <Button size="xs" color="gray" onClick={handleActivate}>
            Activate
          </Button>
        </>
      ) : (
        <>
          <HiExclamationCircle className="text-red-500 w-6 h-6" />
          <Button size="xs" color="gray" onClick={handleActivate}>
            Activate
          </Button>
        </>
      )}
    </div>
  );
};

ContainerCnCWorkplanStatus.propTypes = {
  cncId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  workplan: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContainerCnCWorkplanStatus;
