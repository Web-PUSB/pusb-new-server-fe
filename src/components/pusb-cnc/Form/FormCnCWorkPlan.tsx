"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Label, TextInput, Select, Textarea } from "flowbite-react";
import { WorkplanCNCRequest } from "@/src/types/pusb-cnc-type";
import { GetPUSBCNCWorkplanByCnCId } from "../../../pages/api/pusb-cnc";
import {
  CreatePUSBCNCWorkplan,
  GetPUSBCNCWorkplanById,
  UpdatePUSBCNCWorkplan,
} from "@/pusb-admin/pages/api/pusb-cnc";

const fetchEventTimelines = async (cncId: string) => {
  try {
    const data = await GetPUSBCNCWorkplanByCnCId(cncId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const FormCnCWorkplan = ({
  isEditMode,
  cncId,
  WorkplanId,
}: {
  isEditMode?: boolean;
  cncId?: string;
  WorkplanId?: string;
}) => {
  console.log(cncId);
  console.log(WorkplanId);
  console.log(isEditMode);
  const { data: session } = useSession();
  const token = session?.user.accessToken || "";
  const router = useRouter();
  const [formCnCWorkplanData, setFormCnCWorkplanData] =
    useState<WorkplanCNCRequest>({
      title: "",
      description: "",
      duration: "",
      date: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;

    setFormCnCWorkplanData((prevData) => ({
      ...prevData,
      [id]: id === "date" ? value : value,
    }));
  };

  useEffect(() => {
    const fetchData = async (cncId: string, WorkplanId: string) => {
      try {
        const data = await GetPUSBCNCWorkplanById(cncId, WorkplanId);
        console.log(data);
        setFormCnCWorkplanData({
          title: data.title,
          description: data.description,
          duration: data.duration,
          date: data.date_parse ? data.date_parse.slice(0, 10) : "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (cncId && WorkplanId && isEditMode) {
      fetchData(cncId, WorkplanId);
    }
  }, [cncId, WorkplanId, isEditMode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedData: WorkplanCNCRequest = {
      title: formCnCWorkplanData.title,
      description: formCnCWorkplanData.description,
      duration: formCnCWorkplanData.duration,
      date: formCnCWorkplanData.date,
    };
    try {
      console.log(
        `title: `,
        formCnCWorkplanData.title,
        `description: `,
        formCnCWorkplanData.description,
        `duration: `,
        formCnCWorkplanData.duration,
        `date: `,
        formCnCWorkplanData.date,
      );
      if (cncId) {
        if (isEditMode && WorkplanId) {
          const responseUpdate = await UpdatePUSBCNCWorkplan(
            formattedData,
            token,
            cncId,
            WorkplanId,
          );
          if (responseUpdate) {
            alert("Update successful");
            fetchEventTimelines(cncId);
            router.push(`/admin/pusb-cnc/${cncId}/details`);
          }
        } else {
          const createResponse = await CreatePUSBCNCWorkplan(
            formattedData,
            token,
            cncId,
          );
          if (createResponse) {
            alert("Create successful");
            fetchEventTimelines(cncId);
            router.push(`/admin/pusb-cnc/${cncId}/details`);
          }
        }
      }
      setFormCnCWorkplanData({
        title: "",
        description: "",
        duration: "",
        date: "",
      });
    } catch (error) {
      console.error("Failed to create or update event timeline", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-0 mt-8 max-w-3xl space-y-4"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Workplan Name" />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="Put the title Workplan.."
          required
          shadow
          value={formCnCWorkplanData.title}
          onChange={handleChange}
        />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="date" value="Date" />
          </div>
          <TextInput
            id="date"
            type="date"
            required
            shadow
            value={formCnCWorkplanData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="duration" value="Select Period" />
          </div>
          <Select
            id="duration"
            required
            value={formCnCWorkplanData.duration}
            onChange={handleChange}
          >
            <option value="">Select Period</option>
            <option value="Anualy">Anualy</option>
            <option value="Monthly">Monthly</option>
            <option value="Daily">Daily</option>
          </Select>
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description Workplan" />
        </div>
        <Textarea
          id="description"
          placeholder="Put the Workplan description...."
          required
          rows={4}
          value={formCnCWorkplanData.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="w-full lg:w-1/2 inline-block rounded-lg bg-blue-500 text-base font-medium text-white py-2.5"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormCnCWorkplan;
