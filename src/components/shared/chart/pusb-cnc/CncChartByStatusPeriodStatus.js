import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getPUSBCNC } from "../../../../pages/api/pusb-cnc";

ChartJS.register(ArcElement, Tooltip, Legend);

const CncChartByStatus = () => {
  const [chartData, setChartData] = useState(null);
  const [cncNumber, setCncNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cnc = await getPUSBCNC();
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
      } catch (error) {
        console.error("Failed to fetch CNC data:", error);
      }
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
              position: "top",
            },
            title: {
              display: true,
              text: `Total CNC of PUSB: ${cncNumber} CNCs`,
            },
          },
        }}
      />
    </div>
  );
};

export default CncChartByStatus;
