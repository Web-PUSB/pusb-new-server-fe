"use client";
import React, { useState, useEffect } from "react";
import { Label, TextInput, Select } from "flowbite-react";
import { AiFillEye } from "react-icons/ai";
import { HiMail } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { UserRequest } from "@/src/types/pusb-user-type";
import { Role } from "@/src/types/pusb-structure";
import { GetPUSBRole } from "@/pusb-admin/pages/api/pusb-structure";
import Loader from "../../shared/Loader";
import { CreatePUSBUser } from "@/src/pages/api/pusb-user";
import SuccessMessageAlert from "@/src/lib/SuccessMessageAlert";
import WarningMessageAlert from "../../../lib/WarningMessageAlert";
import { useRouter } from "next/navigation";

const FormUser = () => {
  const { data: session } = useSession();
  const token: string | undefined = session?.user?.accessToken;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ministries, setMinistries] = useState<Role[] | null>(null);
  const [userForm, setUserForm] = useState<UserRequest>({
    ministry_id: 0,
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const data = await GetPUSBRole(token);
        setMinistries(data);
      } catch (error) {
        console.error("Error fetching ministry data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const parsedValue = name === "ministry_id" ? parseInt(value, 10) : value;

    setUserForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await CreatePUSBUser(userForm, token as string);
      console.log("User created successfully:", response);
      SuccessMessageAlert(false);
      router.push("/admin/pusb-user");
    } catch (error) {
      console.error("Error creating user:", error);
      WarningMessageAlert("Failed to process data. Please try again later.");
      setUserForm({
        ministry_id: 0,
        name: "",
        email: "",
        password: "",
        role: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-0 mt-8 max-w-3xl space-y-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mb-2 block">
        <div>
          <div className="mb-2">
            <Label htmlFor="name" value="Username" />
          </div>
          <TextInput
            id="name"
            name="name"
            type="text"
            className="text-lg"
            placeholder="Enter your username"
            icon={FaUser}
            required
            shadow
            onChange={handleChange}
          />
        </div>

        <div>
          <div className="mb-2">
            <Label htmlFor="email" value="Email Address" />
          </div>
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            icon={HiMail}
            required
            shadow
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-2">
        <div className="mb-2">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          icon={AiFillEye}
          required
          shadow
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mb-2 block">
        <div>
          <div className="mb-2">
            <Label htmlFor="ministry" value="Ministry" />
          </div>
          <Select
            id="ministry"
            name="ministry_id"
            required
            onChange={handleChange}
          >
            <option value="0s">Select Ministry</option>
            {ministries?.map((ministry) => (
              <option key={ministry.id} value={ministry.id}>
                {ministry.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <div className="mb-2">
            <Label htmlFor="roles" value="Role" />
          </div>
          <Select id="roles" name="role" required onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="SUPERADMIN">Super Admin</option>
            <option value="ADMIN">Admin</option>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="mt-8 w-full lg:w-1/2 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-sm"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default FormUser;
