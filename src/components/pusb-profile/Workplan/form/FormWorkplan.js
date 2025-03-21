import React, { useState, useEffect } from "react";

const FormWorkplan = ({ isEditMode, id, token, onSubmit }) => {
  const [formWorkplanData, setFormWorkplanData] = useState({
    thumbnail: "",
    title: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
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
          const response = await fetch(`/api/pusb-workplan/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();

          if (data) {
            setFormWorkplanData({
              thumbnail: data.thumbnail || "",
              title: data.title || "",
              description: data.description || "",
            });

            if (data.thumbnail) {
              setImagePreview(data.thumbnail);
            }
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

  const handleImageChange = (e) => {
    const file = e.target.files[0] || null;

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

  const handleSubmit = async (e) => {
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
      const url = isEditMode
        ? `/api/pusb-workplan/${id}`
        : `/api/pusb-workplan`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        onSubmit(); // Callback for success
      } else {
        throw new Error("Something went wrong");
      }

      setFormWorkplanData({
        thumbnail: "",
        title: "",
        description: "",
      });
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-0 mt-8 max-w-3xl space-y-4"
    >
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block mb-2">
          Name
        </label>
        <input
          id="title"
          type="text"
          placeholder="Put Workplan name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={formWorkplanData.title}
          onChange={handleChange}
        />
      </div>

      {/* Description Input */}
      <div>
        <label htmlFor="description" className="block mb-2">
          Description Workplan
        </label>
        <textarea
          id="description"
          placeholder="Put the Workplan description..."
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={formWorkplanData.description}
          onChange={handleChange}
        />
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block mb-2">
          Workplan Image
        </label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          className="w-full"
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Thumbnail Preview"
              className="h-20 w-20 object-cover rounded-md"
            />
          </div>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="w-full lg:w-1/2 text-base py-2.5 rounded-lg bg-blue-500 font-medium text-white"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default FormWorkplan;
