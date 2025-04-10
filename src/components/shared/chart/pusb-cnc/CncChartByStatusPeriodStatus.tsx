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

const CncChartByStatus = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [cncNumber, setCncNumber] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const cnc: CNC[] = await GetPUSBCNC();
      setCncNumber(cnc.length);
      const statusCounts = {
        Active: 0,
        Inactive: 0,
      };

      cnc.forEach((item) => {
        if (item.status) {
          statusCounts.Active++;
        } else {
          statusCounts.Inactive++;
        }
      });

      setChartData({
        labels: ["Active", "Inactive"],
        datasets: [
          {
            data: [statusCounts.Active, statusCounts.Inactive],
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 99, 132, 0.6)",
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

export default CncChartByStatus;
