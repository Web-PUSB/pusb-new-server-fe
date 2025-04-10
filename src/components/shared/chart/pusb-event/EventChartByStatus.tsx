"use client";
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
import { Events } from "@/pusb-admin/types/pusb-event-type";
import { GetPUSBEvent } from "@/src/pages/api/pusb-events";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

const EventChartByStatus = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [eventsNumber, setEventsNumber] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const events: Events[] = await GetPUSBEvent();
      setEventsNumber(events.length);
      const months = Array.from({ length: 12 }, (_, i) =>
        new Date(0, i).toLocaleString("default", { month: "short" }),
      );
      const completedCounts = Array(12).fill(0);
      const soonCounts = Array(12).fill(0);

      events.forEach((event) => {
        const month = new Date(event.start_date).getMonth();
        if (event.status === "COMPLETED") {
          completedCounts[month]++;
        } else if (event.status === "SOON") {
          soonCounts[month]++;
        } else if (event.status === "PRESENT") {
          soonCounts[month]++;
        }
      });

      setChartData({
        labels: months,
        datasets: [
          {
            label: "Completed",
            data: completedCounts,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "Soon",
            data: soonCounts,
            backgroundColor: "rgba(255, 159, 64, 0.6)",
          },
          {
            label: "PRESENT",
            data: soonCounts,
            backgroundColor: "rgba(195, 159, 64, 0.6)",
          },
        ],
      });
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
              position: "top" as const,
            },
            title: {
              display: true,
              text: `Total Events of PUSB: ${eventsNumber} event's`,
            },
          },
        }}
      />
    </div>
  );
};

export default EventChartByStatus;
