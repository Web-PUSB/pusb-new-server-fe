"use client";
import React, { useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { RoleRequest } from "../../../../types/pusb-structure";

const FormMinister = () => {
  const [role, setRole] = useState<RoleRequest>({
    level: 0,
    name: "",
    parent_id: 0,
    highlight: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setRole((prevRole) => ({
      ...prevRole,
      [id]: id === "level" || id === "parent_id" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., sending the data to an API
    console.log("Submitted role Data:", role);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-0 mt-8 max-w-3xl space-y-4"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Minister Name" />
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="John Doe"
          required
          shadow
          value={role.name}
          onChange={handleChange}
        />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="parent_id" value="Parent" />
          </div>
          <TextInput
            id="parent_id"
            type="number"
            placeholder="Parent ID"
            required
            shadow
            value={role.parent_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="level" value="Level" />
          </div>
          <TextInput
            id="level"
            type="number"
            placeholder="Level"
            required
            shadow
            value={role.level}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="highlight" value="Highlight" />
        </div>
        <Textarea
          id="highlight"
          placeholder="Put the minister highlight...."
          required
          rows={4}
          value={role.highlight}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <Textarea
          id="description"
          placeholder="Put the minister description...."
          required
          rows={4}
          value={role.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-end">
        <Button
          type="submit"
          className="inline-block rounded-lg bg-blue-500 px-20 text-sm font-medium text-white"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default FormMinister;
