import React from "react";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import EventList from "./EventList";
import { Events } from "@/src/types/pusb-event-type";
const ContainerEventList = ({ events }: { events: Events[] }) => {
  return (
    <div>
      <div className="my-4 w-full flex justify-end z-50">
        <Link href={`pusb-events/create`}>
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </Link>
      </div>
      <EventList events={events} />
    </div>
  );
};

export default ContainerEventList;
