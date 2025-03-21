"use client";

import React, { useState, useEffect } from "react";
import { Label, TextInput, Select } from "flowbite-react";
import { AiFillEye } from "react-icons/ai";
import { HiMail } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import Loader from "../../shared/Loader";
import SuccessMessageAlert from "../../../lib/SuccessMessageAlert";
import WarningMessageAlert from "../../../lib/WarningMessageAlert";
import { GetPUSBRole, CreatePUSBUser } from "../../../pages/api/pusb-structure";

const FormUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ministries, setMinistries] = useState(null);
  const [userForm, setUserForm] = useState({
    ministry_id: 0,
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const data = await GetPUSBRole();
        setMinistries(data);
      } catch (error) {
        console.error("Error fetching ministry data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRole();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "ministry_id" ? parseInt(value, 10) : value;
    setUserForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await CreatePUSBUser(userForm);
      SuccessMessageAlert(false);
    } catch (error) {
      console.error("Error creating user:", error);
      WarningMessageAlert("Failed to process data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
      <div className="grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mb-2 block">
        <div>
          <Label htmlFor="name" value="Username" />
          <TextInput id="name" name="name" type="text" placeholder="Enter your username" icon={FaUser} required shadow onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="email" value="Email Address" />
          <TextInput id="email" name="email" type="email" placeholder="you@example.com" icon={HiMail} required shadow onChange={handleChange} />
        </div>
      </div>
      <div>
        <Label htmlFor="password" value="Password" />
        <TextInput id="password" name="password" type="password" placeholder="Enter your password" icon={AiFillEye} required shadow onChange={handleChange} />
      </div>
      <div className="grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mb-2 block">
        <div>
          <Label htmlFor="ministry" value="Ministry" />
          <Select id="ministry" name="ministry_id" required onChange={handleChange}>
            <option value="0">Select Ministry</option>
            {ministries?.map((ministry) => (
              <option key={ministry.id} value={ministry.id}>{ministry.name}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="roles" value="Role" />
          <Select id="roles" name="role" required onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="SUPERADMIN">Super Admin</option>
            <option value="ADMIN">Admin</option>
          </Select>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button type="submit" className="mt-8 w-full lg:w-1/2 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-sm" disabled={isLoading}>
          {isLoading ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default FormUser;