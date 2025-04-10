"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import { FileInput, Label, TextInput, Select, Textarea } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UpdatePUSBEvent } from "../../../pages/api/pusb-events";
import {
  CreatePUSBEvent,
  GetPUSBEventById,
} from "../../../pages/api/pusb-events";
import { Events } from "@/pusb-admin/types/pusb-event-type";
import SuccessMessageAlert from "@/pusb-admin/lib/SuccessMessageAlert";
import FailedMessageAlert from "@/pusb-admin/lib/FailedMessageAlert";
import WarningMessageAlert from "@/pusb-admin/lib/WarningMessageAlert";
import Loader from "@/pusb-admin/components/shared/Loader";
const FormEvent = ({
  isEditMode,
  id,
}: {
  isEditMode?: boolean;
  id?: string;
}) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken || "";
  const router = useRouter();
  const [events, setEvents] = useState<Events | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [audience, setAudience] = useState("");
  const [period, setPeriod] = useState("");
  const [ministry, setMinistry] = useState("1");
  const [participantLink, setParticipantLink] = useState("");
  const [recruitmentLink, setRecruitmentLink] = useState("");
  const [audienceLink, setAudienceLink] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNewsData = async () => {
      if (isEditMode && id) {
        try {
          setIsLoading(false);
          const data = await GetPUSBEventById(id);
          if (data) {
            setEvents(data);
            setName(data.name);
            setDescription(data.description);
            setStartDate(data.start_date ? data.start_date.slice(0, 10) : "");
            setEndDate(data.end_date ? data.end_date.slice(0, 10) : "");
            setStatus(data.status);
            setAudience(data.audience);
            setPeriod(data.period);
            // setMinistry(data.ministry_name);
            setMinistry("1");
            setParticipantLink(data.participant_link);
            setRecruitmentLink(data.recruitment_link);
            setAudienceLink(data.audience_link);
            setThumbnail(data.thumbnail);
            if (data.thumbnail) {
              setPreview(data.thumbnail);
            }
          } else {
            WarningMessageAlert("No news item found with the provided slug.");
          }
        } catch (error) {
          FailedMessageAlert("Failed to process data. Please try again later.");
          console.log(error);
        }
      }
    };

    fetchNewsData();
  }, [isEditMode, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (startDate && endDate && startDate > endDate) {
      WarningMessageAlert("End date must be after the start date");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("ministry_id", ministry);

    formData.append("description", description);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("status", status);
    formData.append("audience", audience);
    formData.append("period", period);
    formData.append("participant_link", participantLink);
    formData.append("recruitment_link", recruitmentLink);
    formData.append("audience_link", audienceLink);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    try {
      if (isEditMode && id && events) {
        const responseUpdate = await UpdatePUSBEvent(
          formData,
          token,
          events.id,
        );
        if (responseUpdate) {
          SuccessMessageAlert(true);
          router.push(`/admin/pusb-events/${id}/details`);
        }
      } else {
        const createResponse = await CreatePUSBEvent(formData, token);
        if (createResponse) {
          SuccessMessageAlert(false);
          router.push("/admin/pusb-events");
        }
      }
    } catch (error) {
      FailedMessageAlert("Failed to process data. Please try again later.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setThumbnail(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setStartDate(e.target.value);
    if (endDate && e.target.value > endDate) {
      FailedMessageAlert("Start date cannot be after the end date");
    }
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEndDate(e.target.value);
    if (startDate && e.target.value < startDate) {
      FailedMessageAlert("End date must be after the start date");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-0 mt-8 max-w-3xl space-y-4"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Event Name" />
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="Enter the event name"
          required
          shadow
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Event Description" />
        </div>
        <Textarea
          id="description"
          placeholder="Provide a detailed event description"
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="start_date" value="Start Date" />
          </div>
          <TextInput
            id="start_date"
            type="date"
            required
            shadow
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="end_date" value="End Date" />
          </div>
          <TextInput
            id="end_date"
            type="date"
            required
            shadow
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="status" value="Event Status" />
          </div>
          <Select
            id="status"
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select event status</option>
            <option value="PRESENT">Ongoing</option>
            <option value="SOON">Upcoming</option>
            <option value="COMPLETED">Completed</option>
          </Select>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="audience" value="Target Audience" />
          </div>
          <Select
            id="audience"
            required
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          >
            <option value="">Select target audience</option>
            <option value="Public">Public</option>
            <option value="Cnc">CnC</option>
          </Select>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="period" value="Event Frequency" />
          </div>
          <Select
            id="period"
            required
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="">Select frequency</option>
            <option value="Annualy">Annually</option>
            <option value="Monthly">Monthly</option>
            <option value="Daily">Daily</option>
          </Select>
        </div>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="participant_link" value="Participation Link" />
        </div>
        <TextInput
          id="participant_link"
          type="text"
          placeholder="Enter the participation link"
          rightIcon={HiMail}
          required
          shadow
          value={participantLink}
          onChange={(e) => setParticipantLink(e.target.value)}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="recruitment_link" value="Recruitment Link" />
        </div>
        <TextInput
          id="recruitment_link"
          type="text"
          placeholder="Enter the recruitment link"
          rightIcon={HiMail}
          required
          shadow
          value={recruitmentLink}
          onChange={(e) => setRecruitmentLink(e.target.value)}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="audience_link" value="Audience Link" />
        </div>
        <TextInput
          id="audience_link"
          type="text"
          placeholder="Enter the audience link"
          rightIcon={HiMail}
          required
          shadow
          value={audienceLink}
          onChange={(e) => setAudienceLink(e.target.value)}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="thumbnail" value="Event Thumbnail" />
        </div>
        <FileInput
          id="thumbnail"
          helperText="Upload the event thumbnail"
          onChange={handleThumbnailChange}
        />
        {preview && (
          <div className="mt-2">
            <Image
              src={preview}
              width={100}
              height={100}
              alt="Thumbnail Preview"
              className="h-30 w-30"
            />
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-end">
        <button
          type="submit"
          className="w-full lg:w-1/2 inline-block rounded-lg bg-blue-500 text-base font-medium text-white py-2.5"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default FormEvent;
