"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Card from "@/pusb-admin/components/shared/Card";
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "@/pusb-admin/styles/MiniCalendar.css";
import { Events } from "@/src/types/pusb-event-type";
import { GetPUSBEvent } from "../../pages/api/pusb-events";
import SelectDateAlert from "@/src/lib/SelectDateAlert";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const MiniCalendar = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const [value, setValue] = useState<Date | null>(new Date());

  useEffect(() => {
    setValue(new Date());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const events: Events[] = await GetPUSBEvent();
      setEvents(events);
    };

    fetchData();
  }, []);

  const renderEventMarker = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const eventsForDay = events.filter((event) => {
        const eventStartDate = new Date(event.start_date);
        const eventEndDate = new Date(event.end_date);
        return isSameDay(date, eventStartDate) || isSameDay(date, eventEndDate);
      });

      if (eventsForDay.length > 0) {
        return (
          <div>
            <div
              style={{
                backgroundColor: "#ffcc00",
                borderRadius: "50%",
                height: "8px",
                width: "8px",
                margin: "auto",
                marginTop: "2px",
              }}
            ></div>
          </div>
        );
      }
    }
    return null;
  };

  const handleDateChange = (value: Value) => {
    let selectedDate: Date | null = null;

    if (Array.isArray(value)) {
      selectedDate = value[0];
    } else {
      selectedDate = value;
    }

    if (selectedDate) {
      setValue(selectedDate);

      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const eventsForDay = events.filter((event) => {
        const eventStartDate = new Date(event.start_date);
        const eventEndDate = new Date(event.end_date);
        return (
          isSameDay(selectedDate as Date, eventStartDate) ||
          isSameDay(selectedDate as Date, eventEndDate)
        );
      });

      const eventDetailsList = eventsForDay
        .map((event) => {
          const isStart = isSameDay(
            selectedDate as Date,
            new Date(event.start_date),
          );
          const isEnd = isSameDay(
            selectedDate as Date,
            new Date(event.end_date),
          );

          if (isStart && isEnd) {
            return `<li>The event <strong>${event.name}</strong> starts and ends on this day.</li>`;
          } else if (isStart) {
            return `<li>The event <strong>${event.name}</strong> starts on this day.</li>`;
          } else if (isEnd) {
            return `<li>The event <strong>${event.name}</strong> ends on this day.</li>`;
          }
          return "";
        })
        .filter(Boolean);

      SelectDateAlert({ formattedDate, eventDetailsList });
    }
  };

  return (
    <div>
      <Card extra="flex w-full h-full flex-col justify-center items-center px-3 py-3 text-black">
        <Calendar
          value={value}
          onChange={handleDateChange}
          prevLabel={<MdChevronLeft className="ml-1 h-6 w-6 " />}
          nextLabel={<MdChevronRight className="ml-1 h-6 w-6 " />}
          view={"month"}
          tileContent={renderEventMarker}
        />
      </Card>
    </div>
  );
};

export default MiniCalendar;
