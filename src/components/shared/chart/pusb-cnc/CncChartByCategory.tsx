"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GetPUSBCNC } from "@/pusb-admin/pages/api/pusb-cnc";
import { CNC } from "@/pusb-admin/types/pusb-cnc-type";

ChartJS.register(ArcElement, Tooltip, Legend);
interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

const CncChartByCategory = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [cncNumber, setCncNumber] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const cnc: CNC[] = await GetPUSBCNC();
      setCncNumber(cnc.length);

      const categoryCounts = {
        Sport: 0,
        Art: 0,
        Society: 0,
      };

      cnc.forEach((item) => {
        if (item.category === "Sport") {
          categoryCounts.Sport++;
        } else if (item.category === "Art") {
          categoryCounts.Art++;
        } else if (item.category === "Society") {
          categoryCounts.Society++;
        }
      });

      setChartData({
        labels: ["Sport", "Art", "Society"],
        datasets: [
          {
            data: [
              categoryCounts.Sport,
              categoryCounts.Art,
              categoryCounts.Society,
            ],
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
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
      <Pie
        data={chartData}
        style={{ width: "200px", height: "200px" }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: `Total CnC of PUSB: ${cncNumber} cnc's`,
            },
          },
        }}
      />
    </div>
  );
};

export default CncChartByCategory;
