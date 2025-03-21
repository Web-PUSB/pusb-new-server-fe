import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Card from "../../components/shared/Card"; // Adjust import path
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "../../styles/MiniCalendar.css"; // Adjust import path
import { GetPUSBEvent } from "../../api/pusb-events"; // Adjust import path
import SelectDateAlert from "../../lib/SelectDateAlert"; // Adjust import path

const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const MiniCalendar = () => {
  const [events, setEvents] = useState([]);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    setValue(new Date());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const events = await GetPUSBEvent();
      setEvents(events);
    };

    fetchData();
  }, []);

  const renderEventMarker = ({ date, view }) => {
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

  const handleDateChange = (value) => {
    let selectedDate = Array.isArray(value) ? value[0] : value;

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
        return isSameDay(selectedDate, eventStartDate) || isSameDay(selectedDate, eventEndDate);
      });

      const eventDetailsList = eventsForDay
        .map((event) => {
          const isStart = isSameDay(selectedDate, new Date(event.start_date));
          const isEnd = isSameDay(selectedDate, new Date(event.end_date));

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
          prevLabel={<MdChevronLeft className="ml-1 h-6 w-6" />}
          nextLabel={<MdChevronRight className="ml-1 h-6 w-6" />}
          view="month"
          tileContent={renderEventMarker}
        />
      </Card>
    </div>
  );
};

export default MiniCalendar;
