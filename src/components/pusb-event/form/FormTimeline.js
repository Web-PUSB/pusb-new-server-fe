import React, { useState, useEffect } from "react";

const FormTimeline = ({ isEditMode, eventId, timelineId }) => {
  const [formEventTimelineData, setFormEventTimelineData] = useState({
    title: "",
    description: "",
    event_date: "",
  });
  const [endEventDate, setEndEventDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormEventTimelineData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    setFormEventTimelineData((prevData) => ({
      ...prevData,
      event_date: selectedDate,
    }));

    if (endEventDate && selectedDate > endEventDate) {
      alert("Timeline event date cannot be later than event end date.");
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    const fetchData = async (eventId, timelineId) => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/pusb-events/${eventId}/timeline/${timelineId}`);
        const data = await response.json();
        setFormEventTimelineData({
          title: data.title,
          description: data.description,
          event_date: data.event_date ? data.event_date.slice(0, 10) : "",
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId && timelineId && isEditMode) {
      fetchData(eventId, timelineId);
    }
  }, [eventId, timelineId, isEditMode]);

  useEffect(() => {
    const fetchEventData = async (eventId) => {
      try {
        const response = await fetch(`/api/pusb-events/${eventId}`);
        const eventData = await response.json();
        setEndEventDate(eventData.end_date ? eventData.end_date.slice(0, 10) : "");
      } catch (error) {
        console.error("Failed to fetch event data:", error);
      }
    };

    if (eventId) {
      fetchEventData(eventId);
    }
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formattedData = {
      title: formEventTimelineData.title,
      description: formEventTimelineData.description,
      event_date: formEventTimelineData.event_date,
    };

    try {
      let response;
      if (isEditMode && timelineId) {
        response = await fetch(`/api/pusb-events/${eventId}/timeline/${timelineId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
        });
      } else {
        response = await fetch(`/api/pusb-events/${eventId}/timeline`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
        });
      }

      if (response.ok) {
        alert("Successfully processed data.");
        window.location.href = `/admin/pusb-events/${eventId}/details`;
      } else {
        throw new Error("Failed to process data");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to process data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-2xl space-y-4">
      <div>
        <label htmlFor="title" className="block mb-2 text-sm font-medium">
          Timeline Event Name
        </label>
        <input
          id="title"
          type="text"
          placeholder="Timeline Event Name..."
          value={formEventTimelineData.title}
          onChange={handleChange}
          disabled={isDisabled}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-2 text-sm font-medium">
          Description Timeline Event
        </label>
        <textarea
          id="description"
          placeholder="Put the description..."
          value={formEventTimelineData.description}
          onChange={handleChange}
          disabled={isDisabled}
          required
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="event_date" className="block mb-2 text-sm font-medium">
          Event Date
        </label>
        <input
          id="event_date"
          type="date"
          value={formEventTimelineData.event_date}
          onChange={handleStartDateChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className={`w-full lg:w-1/2 text-white font-medium p-2 rounded ${
            isLoading || isDisabled ? "bg-gray-400" : "bg-blue-500"
          }`}
          disabled={isLoading || isDisabled}
        >
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default FormTimeline;
