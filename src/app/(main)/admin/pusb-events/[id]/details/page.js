import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContainerEvent from "../../components/pusb-event/ContainerEvent";
import { getPUSBEventById, getPUSBEventTimeline } from "../../api/pusb-events";

const Page = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [eventTimeline, setEventTimeline] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const fetchedEvent = await getPUSBEventById(id);
        const fetchedEventTimeline = await getPUSBEventTimeline(id);

        if (!fetchedEvent || !fetchedEventTimeline) {
          throw new Error("Failed to fetch event data.");
        }

        setEvent(fetchedEvent);
        setEventTimeline(fetchedEventTimeline);
      } catch (err) {
        console.error("Error fetching event data:", err);
        setError("An error occurred while loading the event. Please try again later.");
      }
    };

    fetchEventData();
  }, [id]);

  if (error) {
    return (
      <div className="mt-8">
        <p>{error}</p>
      </div>
    );
  }

  if (!event || !eventTimeline.length) {
    return (
      <div className="mt-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <ContainerEvent 
        event={event} 
        eventId={id} 
        eventTimeline={eventTimeline} 
      />
    </div>
  );
};

export default Page;
