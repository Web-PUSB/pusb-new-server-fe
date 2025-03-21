import React from "react";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import EventTimelineList from "./EventTimelineList";

const ContainerEventTimelineList = ({ eventTimeline, eventId }) => {
  return (
    <>
      <div className="my-6 w-full flex justify-end">
        <a href={`details/create-timeline`}>
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </a>
      </div>
      <EventTimelineList eventId={eventId} eventTimeline={eventTimeline} />
    </>
  );
};

export default ContainerEventTimelineList;
