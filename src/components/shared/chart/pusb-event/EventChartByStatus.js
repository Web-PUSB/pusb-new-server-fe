import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getPUSBEvent } from "../../../../pages/api/pusb-events"; 

ChartJS.register(ArcElement, Tooltip, Legend);

const EventChartByStatus = () => {
  const [eventsNumber, setEventsNumber] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPUSBEvent();

        if (!response || !response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid response format from getPUSBEvent");
        }

        const events = response.data;

        setEventsNumber(events.length);

        let approved = 0;
        let rejected = 0;
        let pending = 0;

        events.forEach((event) => {
          const status = event.status?.toLowerCase();
          if (status === "approved") approved++;
          else if (status === "rejected") rejected++;
          else if (status === "pending") pending++;
        });

        setApprovedCount(approved);
        setRejectedCount(rejected);
        setPendingCount(pending);
      } catch (error) {
        console.error("Failed to fetch event data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ["Approved", "Rejected", "Pending"],
    datasets: [
      {
        label: "Event Status",
        data: [approvedCount, rejectedCount, pendingCount],
        backgroundColor: ["#22c55e", "#ef4444", "#eab308"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Event Status Overview</h2>
      <Pie data={data} />
      <div className="mt-4 text-sm text-gray-600">
        Total Events: {eventsNumber}
      </div>
    </div>
  );
};

export default EventChartByStatus;
