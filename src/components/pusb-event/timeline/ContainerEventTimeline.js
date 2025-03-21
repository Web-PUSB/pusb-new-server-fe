import React from "react";
import FormTimeline from "../form/FormTimeline";

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const ContainerEventTimeline = ({ timeline, eventId, timelineId }) => {
  return (
    <>
      {timeline && (
        <div className="w-full">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {timeline.title}
            </h2>
            <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">
              Carried out on: {formatTime(timeline.event_date)}
            </p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
              Description: {timeline.description}
            </p>
          </div>
          <div className="w-full mt-4">
            <FormTimeline
              eventId={eventId}
              timelineId={timelineId}
              isEditMode={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ContainerEventTimeline;
