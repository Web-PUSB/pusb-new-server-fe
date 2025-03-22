import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { GetPUSBEvent } from "../../../../pages/api/pusb-events";

ChartJS.register(ArcElement, Tooltip, Legend);

const EventChartByPeriod = () => {
  const [chartData, setChartData] = useState(null);
  const [eventsNumber, setEventsNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await GetPUSBEvent();
        setEventsNumber(events.length);

        const periodCounts = {
          monthly: 0,
          daily: 0,
          annually: 0,
        };

        events.forEach((event) => {
          if (event.period === "Monthly") {
            periodCounts.monthly++;
          } else if (event.period === "Daily") {
            periodCounts.daily++;
          } else if (event.period === "Annualy") {
            periodCounts.annually++;
          }
        });

        setChartData({
          labels: ["Monthly", "Daily", "Annually"],
          datasets: [
            {
              data: [
                periodCounts.monthly,
                periodCounts.daily,
                periodCounts.annually,
              ],
              backgroundColor: [
                "rgba(54, 162, 235, 0.6)", // Blue
                "rgba(255, 99, 132, 0.6)",  // Red
                "rgba(255, 206, 86, 0.6)",  // Yellow
              ],
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
    <div className="w-full flex justify-center">
      <Pie
        style={{ width: "200px", height: "200px" }}
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

export default EventChartByPeriod;
