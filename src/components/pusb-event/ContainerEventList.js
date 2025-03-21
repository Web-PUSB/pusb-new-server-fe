import React from "react";
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

export default ContainerEventList;
