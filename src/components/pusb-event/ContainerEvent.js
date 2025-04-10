import React from "react";
import { Button } from "flowbite-react";
import { FiEdit } from "react-icons/fi";
import { formatTime } from "../../utils/FormatTime"; 
import ContainerEventTimelineList from "./timeline/ContainerEventTimelineList";

const ContainerEvent = ({ event, eventId, eventTimeline }) => {
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
                  <a
                    href={event.audience_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-800"
                  >
                    {event.audience_link}
                  </a>
                </li>
                <li className="flex items-center gap-2 font-medium text-base">
                  Participant Link:
                  <a
                    href={event.participant_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-800"
                  >
                    {event.participant_link}
                  </a>
                </li>
                <li className="flex items-center gap-2 font-medium text-base">
                  Recruitment Link:
                  <a
                    href={event.recruitment_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-800"
                  >
                    {event.recruitment_link}
                  </a>
                </li>
              </ul>

              <div className="mt-4">
                <a href={`/admin/pusb-events/${event.id}/edit`}>
                  <Button>
                    <FiEdit className="h-5 w-5 mr-2" />
                    Edit Event
                  </Button>
                </a>
              </div>
            </div>

            <div className="w-1/2 flex justify-center">
              <img
                className="w-[14rem] h-[14rem] flex-shrink-0 object-contain xl:w-[18rem] xl:h-[18rem]"
                src={event.thumbnail}
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
