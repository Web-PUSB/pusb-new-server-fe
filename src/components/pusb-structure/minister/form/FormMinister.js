import React, { useState } from "react";

const FormMinister = () => {
  const [role, setRole] = useState({
    level: 0,
    name: "",
    parent_id: 0,
    highlight: "",
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRole((prevRole) => ({
      ...prevRole,
      [id]: id === "level" || id === "parent_id" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., sending the data to an API
    console.log("Submitted role Data:", role);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-0 mt-8 max-w-3xl space-y-4"
    >
      {/* Minister Name */}
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
          Minister Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          required
          value={role.name}
          onChange={handleChange}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Parent ID & Level */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label htmlFor="parent_id" className="block mb-2 text-sm font-medium text-gray-700">
            Parent
          </label>
          <input
            id="parent_id"
            type="number"
            placeholder="Parent ID"
            required
            value={role.parent_id}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-700">
            Level
          </label>
          <input
            id="level"
            type="number"
            placeholder="Level"
            required
            value={role.level}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Highlight */}
      <div>
        <label htmlFor="highlight" className="block mb-2 text-sm font-medium text-gray-700">
          Highlight
        </label>
        <textarea
          id="highlight"
          placeholder="Put the minister highlight..."
          required
          rows="4"
          value={role.highlight}
          onChange={handleChange}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Put the minister description..."
          required
          rows="4"
          value={role.description}
          onChange={handleChange}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="inline-block rounded-lg bg-blue-500 px-8 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormMinister;
