"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Label, TextInput, Textarea } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EventTimelineRequest } from "@/pusb-admin/types/pusb-event-type";
import { GetPUSBEventTimeline } from "../../../pages/api/pusb-events";
import {
  UpdatePUSBEventTimeline,
  CreatePUSBEventTimeline,
} from "@/pusb-admin/pages/api/pusb-events";
import {
  GetPUSBEventTimelineById,
  GetPUSBEventById,
} from "@/src/pages/api/pusb-events";
import SuccessMessageAlert from "@/src/lib/SuccessMessageAlert";
import FailedMessageAlert from "@/src/lib/FailedMessageAlert";
import Loader from "../../shared/Loader";

const fetchEventTimelines = async (eventId: string) => {
  try {
    const data = await GetPUSBEventTimeline(eventId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const FormTimeline = ({
  isEditMode,
  timelineId,
  eventId,
}: {
  isEditMode?: boolean;
  eventId?: string;
  timelineId?: string;
}) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken || "";
  const router = useRouter();
  const [formEventTimelineData, setFormEventTimelineData] =
    useState<EventTimelineRequest>({
      title: "",
      description: "",
      event_date: "",
    });
  const [endEventDate, setEndEventDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;

    setFormEventTimelineData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedDate = e.target.value;
    setFormEventTimelineData((prevData) => ({
      ...prevData,
      event_date: selectedDate,
    }));

    if (endEventDate && selectedDate > endEventDate) {
      FailedMessageAlert(
        "Timeline event date cannot be later than event end date.",
      );
      setIsDisabled(true); // Disable fields if date is invalid
    } else {
      setIsDisabled(false); // Enable fields if date is valid
    }
  };

  useEffect(() => {
    const fetchData = async (eventId: string, timelineId: string) => {
      try {
        setIsLoading(true);
        const data = await GetPUSBEventTimelineById(eventId, timelineId);
        setFormEventTimelineData({
          title: data.title,
          description: data.description,
          event_date: data.event_date ? data.event_date.slice(0, 10) : "",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId && timelineId && isEditMode) {
      fetchData(eventId, timelineId);
    }
  }, [eventId, timelineId, isEditMode]);

  useEffect(() => {
    const fetchDataEvents = async (eventId: string) => {
      const eventData = await GetPUSBEventById(eventId);
      setEndEventDate(
        eventData.end_date ? eventData.end_date.slice(0, 10) : "",
      );
      console.log(eventData.end_date);
    };
    if (eventId) {
      fetchDataEvents(eventId);
    }
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formattedData: EventTimelineRequest = {
      title: formEventTimelineData.title,
      description: formEventTimelineData.description,
      event_date: formEventTimelineData.event_date,
    };
    try {
      if (eventId) {
        if (isEditMode && timelineId) {
          const responseUpdate = await UpdatePUSBEventTimeline(
            formattedData,
            token,
            eventId,
            timelineId,
          );
          if (responseUpdate) {
            SuccessMessageAlert(true);
            fetchEventTimelines(eventId);
            router.push(`/admin/pusb-events/${eventId}/details`);
          }
        } else {
          const createResponse = await CreatePUSBEventTimeline(
            formattedData,
            token,
            eventId,
          );
          if (createResponse) {
            SuccessMessageAlert(false);
            fetchEventTimelines(eventId);
            router.push(`/admin/pusb-events/${eventId}/details`);
          }
        }
      }
      setFormEventTimelineData({
        title: "",
        description: "",
        event_date: "",
      });
      router.push(`/admin/pusb-events/${eventId}/details`);
    } catch (error) {
      FailedMessageAlert("Failed to process data. Please try again later.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-0 mt-8 max-w-2xl space-y-4"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="timeline" value="Timeline Event Name" />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="Timeline Event Name...."
          required
          shadow
          value={formEventTimelineData.title}
          onChange={handleChange}
          disabled={isDisabled} // Disable if the date is invalid
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="content" value="Description Timeline Event" />
        </div>
        <Textarea
          id="description"
          placeholder="Put the description...."
          required
          rows={4}
          value={formEventTimelineData.description}
          onChange={handleChange}
          disabled={isDisabled} // Disable if the date is invalid
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="event_date" value="Event Date" />
        </div>
        <TextInput
          id="event_date"
          type="date"
          required
          shadow
          value={formEventTimelineData.event_date}
          onChange={handleStartDateChange} // Use handleStartDateChange
        />
      </div>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="w-full lg:w-1/2 text-base py-2.5 inline-block rounded-lg bg-blue-500 font-medium text-white"
          disabled={isLoading || isDisabled} // Disable submit if date is invalid or loading
        >
          {isLoading ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default FormTimeline;
