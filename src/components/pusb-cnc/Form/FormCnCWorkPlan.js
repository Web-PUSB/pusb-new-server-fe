import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fetchEventTimelines = async (cncId) => {
  try {
    const response = await fetch(`/api/pusb-cnc/${cncId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const FormCnCWorkplan = ({ isEditMode, cncId, WorkplanId }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(""); 

  const [formCnCWorkplanData, setFormCnCWorkplanData] = useState({
    title: "",
    description: "",
    duration: "",
    date: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormCnCWorkplanData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (cncId && WorkplanId && isEditMode) {
        try {
          const response = await fetch(`/api/pusb-cnc/${cncId}/${WorkplanId}`);
          const data = await response.json();
          setFormCnCWorkplanData({
            title: data.title || "",
            description: data.description || "",
            duration: data.duration || "",
            date: data.date_parse ? data.date_parse.slice(0, 10) : "",
          });
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [cncId, WorkplanId, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isEditMode
        ? `/api/pusb-cnc/${cncId}/${WorkplanId}`
        : `/api/pusb-cnc/${cncId}`;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formCnCWorkplanData),
      });

      if (response.ok) {
        alert(isEditMode ? "Update successful" : "Create successful");
        await fetchEventTimelines(cncId);
        navigate(`/admin/pusb-cnc/${cncId}/details`);
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-3xl space-y-4">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block mb-2 font-medium">
          Workplan Name
        </label>
        <input
          id="title"
          type="text"
          placeholder="Put the title Workplan.."
          value={formCnCWorkplanData.title}
          onChange={handleChange}
          required
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Date and Duration */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Date */}
        <div>
          <label htmlFor="date" className="block mb-2 font-medium">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={formCnCWorkplanData.date}
            onChange={handleChange}
            required
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration" className="block mb-2 font-medium">
            Select Period
          </label>
          <select
            id="duration"
            value={formCnCWorkplanData.duration}
            onChange={handleChange}
            required
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Period</option>
            <option value="Anualy">Anualy</option>
            <option value="Monthly">Monthly</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block mb-2 font-medium">
          Description Workplan
        </label>
        <textarea
          id="description"
          placeholder="Put the Workplan description..."
          value={formCnCWorkplanData.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="w-full lg:w-1/2 rounded-lg bg-blue-500 text-white py-2.5 font-medium hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormCnCWorkplan;
