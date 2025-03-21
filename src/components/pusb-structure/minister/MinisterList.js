import React, { useState, useEffect } from "react";
import { FiTrash, FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MinisterList = ({ token }) => {
  const [ministries, setMinistries] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMinistry = async () => {
      try {
        const response = await fetch("/api/pusb-structure", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setMinistries(data);
      } catch (error) {
        console.error("Error fetching ministry data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMinistry();
  }, [token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Level</th>
            <th className="border border-gray-300 px-4 py-2">Parent ID</th>
            <th className="border border-gray-300 px-4 py-2">Jobdesc</th>
            <th className="border border-gray-300 px-4 py-2">Member</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ministries && ministries.length > 0 ? (
            ministries.map((minister) => (
              <tr key={minister.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {minister.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {minister.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {minister.level}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {minister.parent_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(`/pusb-structure/minister/${minister.id}/jobdesc`)
                    }
                    className="text-cyan-600 hover:underline"
                  >
                    Jobdesc
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(`/pusb-structure/minister/${minister.id}/teammember`)
                    }
                    className="text-cyan-600 hover:underline"
                  >
                    Team
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">Active</td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/pusb-structure/minister/${minister.id}/edit`)
                    }
                    className="text-cyan-600 hover:underline"
                  >
                    <FiEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => console.log("Delete", minister.id)}
                    className="text-red-600 hover:underline"
                  >
                    <FiTrash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                className="text-center py-4 text-gray-500"
              >
                No rows data found...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MinisterList;
