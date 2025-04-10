import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getPUSBNews } from "../../../../pages/api/pusb-news";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartNewsByCategory = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const news = await getPUSBNews(); 

        if (!Array.isArray(news)) {
          console.error("Invalid news data:", news);
          return;
        }

        const categoryCounts = {
          "Press Release": Array(12).fill(0),
          Workplan: Array(12).fill(0),
          Event: Array(12).fill(0),
        };

        const currentYear = new Date().getFullYear();
        

        news.forEach((item) => {
          const publishDate = new Date(item.publish_date);
          const publishMonth = publishDate.getMonth();
          const publishYear = publishDate.getFullYear();

          if (publishYear === currentYear) {
            if (categoryCounts[item.category]) {
              categoryCounts[item.category][publishMonth]++;
            }
          }
        });

        const labels = Array.from({ length: 12 }, (_, i) =>
          new Date(currentYear, i).toLocaleString("default", { month: "short" })
        );

        const datasets = Object.keys(categoryCounts).map((category, index) => ({
          label: category,
          data: categoryCounts[category].reduce((acc, count, i) => {
            acc.push((acc[i - 1] || 0) + count); 
            return acc;
          }, []),
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)", 
            "rgba(255, 159, 64, 0.6)", 
            "rgba(153, 102, 255, 0.6)",
          ][index],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(153, 102, 255, 1)",
          ][index],
          borderWidth: 1,
        }));

        setChartData({
          labels,
          datasets,
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
      <Bar
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
              text: "Number of News Items by Category (Current Year)",
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

export default ChartNewsByCategory;
