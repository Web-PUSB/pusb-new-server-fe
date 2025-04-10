import React from "react";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import EventTimelineList from "./EventTimelineList";
import { EventTimeline } from "../../../types/pusb-event-type";
const ContainerEventTimelineList = ({
  eventTimeline,
  eventId,
}: {
  eventId: string;
  eventTimeline: EventTimeline[];
}) => {
  return (
    <>
      <div className="my-6 w-full flex justify-end">
        <Link href={`details/create-timeline`}>
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </Link>
      </div>
      <EventTimelineList eventId={eventId} eventTimeline={eventTimeline} />
    </>
  );
};

export default ContainerEventTimelineList;
