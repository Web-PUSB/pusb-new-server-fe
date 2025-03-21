import React, { useEffect, useState } from "react";
import ContainerCnC from "../components/pusb-cnc/ContainerCnC";

const Page = ({ match }) => {
  const [cnc, setCnc] = useState(null);
  const { id } = match.params;

  useEffect(() => {
    const fetchCnc = async () => {
      try {
        const response = await fetch(`/api/pusb-cnc/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCnc(data);
        } else {
          console.error("Failed to fetch CNC data");
        }
      } catch (error) {
        console.error("Error fetching CNC data:", error);
      }
    };

    fetchCnc();
  }, [id]);

  return (
    <div className="mt-4">
      {cnc ? <ContainerCnC cnc={cnc} /> : <p>Loading...</p>}
    </div>
  );
};

export default Page;
