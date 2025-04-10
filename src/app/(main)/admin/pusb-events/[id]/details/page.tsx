import ContainerEvent from "@/src/components/pusb-event/ContainerEvent";
import {
  GetPUSBEventById,
  GetPUSBEventTimeline,
} from "@/src/pages/api/pusb-events";
import { Events, EventTimeline } from "@/src/types/pusb-event-type";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  try {
    const eventId = params.id;
    const event: Events | null = await GetPUSBEventById(params.id);
    const eventTimeline: EventTimeline[] | null = await GetPUSBEventTimeline(
      params.id,
    );

    if (!event || !eventTimeline) {
      throw new Error("Failed to fetch event data.");
    }

    return (
      <div className="mt-8">
        <ContainerEvent
          event={event}
          eventId={eventId}
          eventTimeline={eventTimeline}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching event data:", error);

    return (
      <div className="mt-8">
        <p>
          An error occurred while loading the event. Please try again later.
        </p>
      </div>
    );
  }
};

export default Page;
