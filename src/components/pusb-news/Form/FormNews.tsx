"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FileInput, Label, TextInput, Select, Textarea } from "flowbite-react";
import { useRouter } from "next/navigation";
import {
  CreatePUSBNews,
  GetPUSBNewsBySlug,
  UpdatePUSBNews,
} from "@/src/pages/api/pusb-news";
import { News } from "@/src/types/pusb-news-type";
import Loader from "../../shared/Loader";
import SuccessMessageAlert from "@/src/lib/SuccessMessageAlert";
import FailedMessageAlert from "../../../lib/FailedMessageAlert";

const FormNews = ({
  isEditMode,
  slug,
}: {
  isEditMode?: boolean;
  slug?: string;
}) => {
  const [news, setNews] = useState<News | null>(null);
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [publishDate, setPublishDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const token = session?.user.accessToken || "";
  const router = useRouter();

  useEffect(() => {
    const fetchNewsData = async () => {
      if (isEditMode && slug) {
        try {
          setIsLoading(true);
          const data: News = await GetPUSBNewsBySlug(slug);
          console.log(data);
          if (data) {
            setNews(data);
            setTitle(data.title);
            setCategory(data.category);
            setDescription(data.description);
            setContent(data.content);
            setPublishDate(
              data.publish_date ? data.publish_date.slice(0, 10) : "",
            );
            if (data.thumbnail) {
              setPreview(data.thumbnail);
            }
          } else {
            console.warn("No news item found with the provided slug.");
          }
        } catch (error) {
          console.error("Failed to fetch news data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchNewsData();
  }, [isEditMode, slug]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("content", content);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    formData.append("publish_date", publishDate);

    try {
      if (isEditMode && slug && news) {
        const responseUpdate = await UpdatePUSBNews(formData, token, news.id);
        if (responseUpdate) {
          SuccessMessageAlert(true);
          router.push("/admin/pusb-news");
        }
      } else {
        const createResponse = await CreatePUSBNews(formData, token);
        if (createResponse) {
          SuccessMessageAlert(false);
          router.push("/admin/pusb-news");
        }
      }

      // Clear form fields
      setTitle("");
      setCategory("");
      setDescription("");
      setThumbnail(null);
      setPublishDate("");
    } catch (error) {
      FailedMessageAlert("Something went wrong. Please try again.");
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
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-0 mt-8 max-w-3xl space-y-4"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Title News" />
          </div>
          <TextInput
            id="title"
            type="text"
            placeholder="Enter title news"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Select news category" />
          </div>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value={``}>Select Category</option>
            <option value="Press Release">Press Release</option>
            <option value="Event">Event</option>
            <option value="Workplan">Workplan</option>
          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="date" value="Date" />
          </div>
          <TextInput
            id="date"
            type="date"
            required
            shadow
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Short Description News" />
        </div>
        <Textarea
          id="description"
          placeholder="Put the short description news"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={2}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="content" value="Content News" />
        </div>
        <Textarea
          id="content"
          placeholder="Put the news content...."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="Thumbnail" value="Thumbnail News" />
        </div>
        <FileInput
          id="file"
          helperText="Thumbnail of news"
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

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="w-full flex justify-center items-center lg:w-1/2 text-base py-2.5 inline-block rounded-lg bg-blue-500 font-medium text-white"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
};
export default FormNews;
