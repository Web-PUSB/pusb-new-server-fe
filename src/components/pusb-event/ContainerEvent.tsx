import React from "react";
import { Events, EventTimeline } from "@/src/types/pusb-event-type";
import Image from "next/image";
import { Button } from "flowbite-react";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { formatTime } from "@/src/utils/FormatTime";
import ContainerEventTimelineList from "./timeline/ContainerEventTimelineList";
const ContainerEvent = ({
  event,
  eventId,
  eventTimeline,
}: {
  event: Events;
  eventId: string;
  eventTimeline: EventTimeline[];
}) => {
  return (
    <section>
      {event && (
        <>
          <div className="w-full flex justify-between items-center">
            <div className="w-full">
              <h2 className="text-3xl font-bold text-gray-800">{event.name}</h2>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-400">
                Organized by the {event.ministry_name} Ministry
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-400">
                Period: {event.period} | Audience: {event.audience}
              </p>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Starts: {formatTime(event.start_date)} | Ends:{" "}
                {formatTime(event.end_date)}
              </p>
                
              <ul className="mt-2 space-y-2">
                <li className="flex items-center gap-2 font-medium text-base">
                  Audience Link:
                  <Link href={event.audience_link}>
                    <p className="text-sm font-semibold text-blue-800">
                      {event.audience_link}
                    </p>
                  </Link>
                </li>
                <li className="flex items-center gap-2 font-medium text-base">
                  Participant Link:
                  <Link href={event.participant_link}>
                    <p className="text-sm font-semibold text-blue-800">
                      {event.participant_link}
                    </p>
                  </Link>
                </li>
                <li className="flex items-center gap-2 font-medium text-base">
                  Recruitment Link:
                  <Link href={event.recruitment_link}>
                    <p className="text-sm font-semibold text-blue-800">
                      {event.recruitment_link}
                    </p>
                  </Link>
                </li>
              </ul>

              <div className="mt-4">
                <Link href={`/admin/pusb-events/${event.id}/edit`}>
                  <Button>
                    <FiEdit className="h-5 w-5 mr-2" />
                    Edit Event
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-1/2 flex justify-center">
              <Image
                className="w-[14rem] h-[14rem] flex-shrink-0 object-contain xl:w-[18rem] xl:h-[18rem]"
                src={event.thumbnail}
                width={500}
                height={500}
                alt="logo image"
              />
            </div>
          </div>
          <div className="space-y-3 mt-4">
            <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
              Description Event
            </h1>

            <p className="text-gray-500 dark:text-gray-300 text-justify">
              {event.description}
            </p>
          </div>
          <ContainerEventTimelineList
            eventId={eventId}
            eventTimeline={eventTimeline}
          />
        </>
      )}
    </section>
  );
};

export default ContainerEvent;
