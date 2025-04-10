"use client";
import React, { useState, useEffect } from "react";
import { WorkplanRequest } from "@/pusb-admin/types/pusb-workplan.type";
import { FileInput, Label, TextInput, Textarea } from "flowbite-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  CreatePUSBWorkplanCategory,
  UpdatePUSBWorkplanCategory,
  GetPUSBWorkplanCategoryById,
} from "@/src/pages/api/pusb-workplan";
import Loader from "@/src/components/shared/Loader";
import SuccessMessageAlert from "@/src/lib/SuccessMessageAlert";
import FailedMessageAlert from "@/src/lib/FailedMessageAlert";

const FormWorkplan = ({
  isEditMode,
  id,
}: {
  isEditMode?: boolean;
  id?: string;
}) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken || "";
  const router = useRouter();
  const [formWorkplanData, setFormWorkplanData] = useState<WorkplanRequest>({
    thumbnail: "",
    title: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormWorkplanData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchWorkplan = async () => {
      if (isEditMode && id) {
        try {
          setIsLoading(true);
          const data = await GetPUSBWorkplanCategoryById(id);
          if (data) {
            setFormWorkplanData({
              thumbnail: data.thumbnail || "",
              title: data.title || "",
              description: data.description || "",
            });

            if (data.thumbnail) {
              setImagePreview(data.thumbnail);
            }
          } else {
            console.warn("No news item found with the provided slug.");
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchWorkplan();
  }, [isEditMode, id, token]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
      setErrorMessage("");

      setFormWorkplanData((prevData) => ({
        ...prevData,
        thumbnail: file.name,
      }));
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", formWorkplanData.title);
    formData.append("description", formWorkplanData.description);
    if (imageFile) {
      formData.append("thumbnail", imageFile);
    } else {
      formData.append("thumbnail", formWorkplanData.thumbnail);
    }

    try {
      if (isEditMode && id) {
        const responseUpdate = await UpdatePUSBWorkplanCategory(
          formData,
          token,
          id,
        );
        if (responseUpdate) {
          SuccessMessageAlert(true);
          router.push("/admin/pusb-profile");
        }
      } else {
        const createResponse = await CreatePUSBWorkplanCategory(
          formData,
          token,
        );
        if (createResponse) {
          SuccessMessageAlert(false);
          router.push("/admin/pusb-profile");
        }
      }

      setFormWorkplanData({
        thumbnail: "",
        title: "",
        description: "",
      });
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      FailedMessageAlert("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-0 mt-8 max-w-3xl space-y-4"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Name" />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="Put Workplan name"
          required
          shadow
          value={formWorkplanData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description Workplan" />
        </div>
        <Textarea
          id="description"
          placeholder="Put the Workplan description..."
          required
          rows={4}
          value={formWorkplanData.description}
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
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="w-full lg:w-1/2 text-base py-2.5 inline-block rounded-lg bg-blue-500 font-medium text-white"
        >
          {isLoading ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default FormWorkplan;
