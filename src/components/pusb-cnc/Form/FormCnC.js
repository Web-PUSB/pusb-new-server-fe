import React, { useState, useEffect } from "react";
import { FileInput, Label, TextInput, Select, Textarea } from "flowbite-react";
import { CreatePUSBCNC, getPUSBCNCById, UpdatePUSBCNC } from "../../../pages/api/pusb-cnc";
import SuccessMessageAlert from "../../../lib/SuccessMessageAlert";
import FailedMessageAlert from "../../../lib/FailedMessageAlert";
import Loader from "../../shared/Loader";
import PropTypes from "prop-types";

FormCnC.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const FormCnC = ({ isEditMode, id }) => {
  const [formCncData, setFormCncData] = useState({
    short_name: "",
    full_name: "",
    image: "",
    category: "",
    highlight: "",
    description: "",
    instagram: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
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
          const data = await getPUSBCNCById(id);
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

  const handleImageChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!imageFile) {
      FailedMessageAlert("Please select an image file.");
      setIsLoading(false);
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
        const responseUpdate = await UpdatePUSBCNC(formData, id);
        if (responseUpdate) {
          SuccessMessageAlert(true);
          window.location.href = "/admin/pusb-cnc";
        }
      } else {
        const createResponse = await CreatePUSBCNC(formData);
        if (createResponse) {
          SuccessMessageAlert(false);
          window.location.href = "/admin/pusb-cnc";
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
          <Label htmlFor="short_name" value="Short Name" />
          <TextInput
            id="short_name"
            type="text"
            placeholder="John Dea"
            required
            value={formCncData.short_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="full_name" value="Full Name" />
          <TextInput
            id="full_name"
            type="text"
            placeholder="John Dea"
            required
            value={formCncData.full_name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category" value="Select Category" />
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
          <Label htmlFor="instagram" value="Instagram Account" />
          <TextInput
            id="instagram"
            type="text"
            placeholder="@pusb"
            required
            value={formCncData.instagram}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="highlight" value="Highlight" />
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
        <Label htmlFor="description" value="Description CNC" />
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
        <Label htmlFor="image" value="News Image" />
        <FileInput id="image" onChange={handleImageChange} />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
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

FormCnC.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FormCnC;
