import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { GetPUSBNews } from "../api/pusb-news"; // Adjust path as needed

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ChartNewsByPublished = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const news = await GetPUSBNews();

        const monthCounts = Array(12).fill(0);
        const currentYear = new Date().getFullYear();
        const months = Array.from({ length: 12 }, (_, i) =>
          new Date(0, i).toLocaleString("default", { month: "short" })
        );

        news.forEach((item) => {
          const publishDate = new Date(item.publish_date);
          if (publishDate.getFullYear() === currentYear) {
            const month = publishDate.getMonth();
            monthCounts[month]++;
          }
        });

        setChartData({
          labels: months,
          datasets: [
            {
              label: "News Published",
              data: monthCounts,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch news data:", error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Line
        data={chartData}
        height={250}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Number of News Items Published Each Month",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Month",
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of News Items",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default ChartNewsByPublished;
