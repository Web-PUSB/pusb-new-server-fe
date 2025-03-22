import React from "react";
import PropTypes from "prop-types";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import EventList from "./EventList";

const ContainerEventList = ({ events }) => {
  return (
    <div>
      <div className="my-4 w-full flex justify-end z-50">
        <a href={`pusb-events/create`}>
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </a>
      </div>
      <EventList events={events} />
    </div>
  );
};

ContainerEventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, 
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContainerEventList;
