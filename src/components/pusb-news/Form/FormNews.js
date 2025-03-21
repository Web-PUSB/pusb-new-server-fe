import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { FileInput, Label, TextInput, Select, Textarea } from "flowbite-react";
import Loader from "../../shared/Loader";
import { CreatePUSBNews, GetPUSBNewsBySlug, UpdatePUSBNews } from "../../api/pusb-news";
import SuccessMessageAlert from "../../lib/SuccessMessageAlert";
import FailedMessageAlert from "../../lib/FailedMessageAlert";

const FormNews = ({ isEditMode, slug }) => {
  const [news, setNews] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [publishDate, setPublishDate] = useState(new Date().toISOString().slice(0, 10));
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsData = async () => {
      if (isEditMode && slug) {
        try {
          setIsLoading(true);
          const data = await GetPUSBNewsBySlug(slug);
          if (data) {
            setNews(data);
            setTitle(data.title);
            setCategory(data.category);
            setDescription(data.description);
            setContent(data.content);
            setPublishDate(data.publish_date ? data.publish_date.slice(0, 10) : "");
            if (data.thumbnail) {
              setPreview(data.thumbnail);
            }
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

  const handleSubmit = async (e) => {
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
        const responseUpdate = await UpdatePUSBNews(formData, news.id);
        if (responseUpdate) {
          SuccessMessageAlert(true);
          navigate("/admin/pusb-news");
        }
      } else {
        const createResponse = await CreatePUSBNews(formData);
        if (createResponse) {
          SuccessMessageAlert(false);
          navigate("/admin/pusb-news");
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

  const handleThumbnailChange = (e) => {
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
    <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="title" value="Title News" />
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
          <Label htmlFor="category" value="Select news category" />
          <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="Press Release">Press Release</option>
            <option value="Event">Event</option>
            <option value="Workplan">Workplan</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="date" value="Date" />
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
        <Label htmlFor="description" value="Short Description News" />
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
        <Label htmlFor="content" value="Content News" />
        <Textarea
          id="content"
          placeholder="Put the news content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
        />
      </div>
      <div>
        <Label htmlFor="thumbnail" value="Thumbnail News" />
        <FileInput id="file" helperText="Thumbnail of news" onChange={handleThumbnailChange} />
        {preview && (
          <div className="mt-2">
            <img src={preview} width={100} height={100} alt="Thumbnail Preview" className="h-30 w-30" />
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

export default FormNews;
