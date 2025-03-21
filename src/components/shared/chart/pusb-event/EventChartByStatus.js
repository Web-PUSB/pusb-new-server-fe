import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { GetPUSBEvent } from "../api/pusb-events"; // Adjust path as needed

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EventChartByStatus = () => {
  const [chartData, setChartData] = useState(null);
  const [eventsNumber, setEventsNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await GetPUSBEvent();
        setEventsNumber(events.length);

        const months = Array.from({ length: 12 }, (_, i) =>
          new Date(0, i).toLocaleString("default", { month: "short" })
        );

        const completedCounts = Array(12).fill(0);
        const soonCounts = Array(12).fill(0);

        events.forEach((event) => {
          const month = new Date(event.start_date).getMonth();
          if (event.status === "COMPLETED") {
            completedCounts[month]++;
          } else if (event.status === "SOON" || event.status === "PRESENT") {
            soonCounts[month]++;
          }
        });

        setChartData({
          labels: months,
          datasets: [
            {
              label: "Completed",
              data: completedCounts,
              backgroundColor: "rgba(75, 192, 192, 0.6)", // Teal
            },
            {
              label: "Soon/PRESENT",
              data: soonCounts,
              backgroundColor: "rgba(255, 159, 64, 0.6)", // Orange
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch event data:", error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Bar
        height={250}
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `Total Events of PUSB: ${eventsNumber} events`,
            },
          },
        }}
      />
    </div>
  );
};

export default EventChartByStatus;
