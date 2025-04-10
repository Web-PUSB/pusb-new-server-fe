"use client";
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
import { News } from "@/src/types/pusb-news-type";
import { GetPUSBNews } from "@/pusb-admin/pages/api/pusb-news";

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

interface CategoryCounts {
  [key: string]: number[];
}

const ChartNewsByCategory = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const news: News[] = await GetPUSBNews();

      const categoryCounts: CategoryCounts = {
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
          if (item.category in categoryCounts) {
            categoryCounts[item.category][publishMonth]++;
          }
        }
      });

      const labels = Array.from({ length: 12 }, (_, i) => {
        const date = new Date(currentYear, i, 1);
        return date.toLocaleString("default", { month: "short" });
      });

      const datasets = Object.keys(categoryCounts).map((category, index) => ({
        label: category,
        data: categoryCounts[category].map((_, i) => {
          return categoryCounts[category]
            .slice(0, i + 1)
            .reduce((acc, monthCount) => acc + monthCount, 0);
        }),
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
              position: "top" as const,
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
