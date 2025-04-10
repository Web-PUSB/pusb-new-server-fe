"use client";
import React, { useState, useEffect } from "react";
import { FileInput, Label, TextInput, Select, Textarea } from "flowbite-react";
import { CNCRequest } from "@/src/types/pusb-cnc-type";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  CreatePUSBCNC,
  GetPUSBCNCById,
  UpdatePUSBCNC,
} from "@/src/pages/api/pusb-cnc";
import SuccessMessageAlert from "@/src/lib/SuccessMessageAlert";
import FailedMessageAlert from "@/src/lib/FailedMessageAlert";
import Loader from "../../shared/Loader";
const FormCnC = ({ isEditMode, id }: { isEditMode?: boolean; id?: string }) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken || "";
  const router = useRouter();
  const [formCncData, setFormCncData] = useState<CNCRequest>({
    short_name: "",
    full_name: "",
    image: "",
    category: "",
    highlight: "",
    description: "",
    instagram: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormCncData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchCnCData = async () => {
      if (isEditMode && id) {
        try {
          setIsLoading(true);
          const data = await GetPUSBCNCById(id);
          if (data) {
            setFormCncData({
              short_name: data.short_name || "",
              full_name: data.full_name || "",
              image: data.image || "",
              category: data.category || "",
              highlight: data.highlight || "",
              description: data.description || "",
              instagram: data.instagram || "",
            });

            if (data.image) {
              setImageFile(data.image);
              setImagePreview(data.image);
            }
          } else {
            console.warn("No data item found.");
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCnCData();
  }, [isEditMode, id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);

      setFormCncData((prevData) => ({
        ...prevData,
        image: file.name,
      }));
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!imageFile) {
      FailedMessageAlert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("short_name", formCncData.short_name);
    formData.append("full_name", formCncData.full_name);
    formData.append("image", imageFile);
    formData.append("category", formCncData.category);
    formData.append("highlight", formCncData.highlight);
    formData.append("description", formCncData.description);
    formData.append("instagram", formCncData.instagram);

    try {
      if (isEditMode && id) {
        const responseUpdate = await UpdatePUSBCNC(formData, token, id);
        if (responseUpdate) {
          SuccessMessageAlert(true);
          router.push("/admin/pusb-cnc");
        }
      } else {
        const createResponse = await CreatePUSBCNC(formData, token);
        if (createResponse) {
          SuccessMessageAlert(false);
          router.push("/admin/pusb-cnc");
        }
      }

      setFormCncData({
        short_name: "",
        full_name: "",
        image: "",
        category: "",
        highlight: "",
        description: "",
        instagram: "",
      });
    } catch (error) {
      FailedMessageAlert("Failed to process data. Please try again later.");
      console.error("Failed to create or update data", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-0 mt-8 max-w-3xl space-y-4"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="short_name" value="Short Name" />
          </div>
          <TextInput
            id="short_name"
            type="text"
            placeholder="John Dea"
            required
            shadow
            value={formCncData.short_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="full_name" value="Full Name" />
          </div>
          <TextInput
            id="full_name"
            type="text"
            placeholder="John Dea"
            required
            shadow
            value={formCncData.full_name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="category" value="Select Category" />
          </div>
          <Select
            id="category"
            required
            value={formCncData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Sport">Sport</option>
            <option value="Art">Art</option>
            <option value="Society">Society</option>
          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="instagram" value="Instagram Account" />
          </div>
          <TextInput
            id="instagram"
            type="text"
            placeholder="@pusb"
            required
            shadow
            value={formCncData.instagram}
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
          placeholder="Put CNC highlight..."
          required
          rows={3}
          value={formCncData.highlight}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description CNC" />
        </div>
        <Textarea
          id="description"
          placeholder="Put the CNC description..."
          required
          rows={4}
          value={formCncData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="image" value="News Image" />
        </div>
        <FileInput
          id="image"
          helperText="A picture of news"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className="mt-2">
            <Image
              src={imagePreview}
              width={100}
              height={100}
              alt="Thumbnail Preview"
              className="h-30 w-30"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="w-full lg:w-1/2 text-base py-2.5 inline-block rounded-lg bg-blue-500 font-medium text-white"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default FormCnC;
