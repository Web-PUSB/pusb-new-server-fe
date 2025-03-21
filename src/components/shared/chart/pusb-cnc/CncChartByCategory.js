import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GetPUSBCNC } from "../../../../pages/api/pusb-cnc";
import { CNC } from "../../../../types/pusb-cnc-type";

ChartJS.register(ArcElement, Tooltip, Legend);

const CncChartByCategory = () => {
  const [chartData, setChartData] = useState(null);
  const [cncNumber, setCncNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cnc = await GetPUSBCNC();
        setCncNumber(cnc.length);

        const categoryCounts = {
          Sport: 0,
          Art: 0,
          Society: 0,
        };

        cnc.forEach((item) => {
          if (categoryCounts.hasOwnProperty(item.category)) {
            categoryCounts[item.category]++;
          }
        });

        setChartData({
          labels: Object.keys(categoryCounts),
          datasets: [
            {
              data: Object.values(categoryCounts),
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
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
            legend: { position: "top" },
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
