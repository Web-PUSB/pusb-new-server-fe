import React, { useState, useEffect } from "react";
import { FileInput, Label, TextInput, Textarea } from "flowbite-react";
import { CreatePUSBProfile, getPUSBProfile } from "../../../pages/api/pusb-profile";

const FormProfile = ({ isEditMode }) => {
  const [profileData, setProfileData] = useState({
    cabinet_name: "",
    cabinet_logo: "",
    tagline: "",
    address: "",
    vision: "",
    instagram: "",
    email: "",
    podcast: "",
    twitter: "",
    youtube: "",
    linkedin: "",
    phone_number: "",
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      setSession(JSON.parse(userSession));
    }
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const fetchProfileData = async () => {
        try {
          const data = await getPUSBProfile();
          if (data) {
            setProfileData({
              ...profileData,
              ...data,
            });
            if (data.cabinet_logo) {
              setImagePreview(data.cabinet_logo);
            }
          }
        } catch (error) {
          console.error("Failed to fetch profile data", error);
        }
      };
      fetchProfileData();
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfileData({ ...profileData, [id]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
      setProfileData({ ...profileData, cabinet_logo: file.name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
      formData.append(key, profileData[key]);
    });
    if (imageFile) formData.append("cabinet_logo", imageFile);

    try {
      await CreatePUSBProfile(formData, session?.token);
      alert("Profile saved successfully");
      window.location.href = "/admin/pusb-profile";
    } catch (error) {
      console.error("Failed to submit profile data", error);
    }
  };

  return session ? (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-4">
      <div>
        <Label htmlFor="cabinet_name" value="Cabinet Name" />
        <TextInput id="cabinet_name" value={profileData.cabinet_name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="email" value="Email" />
        <TextInput id="email" type="email" value={profileData.email} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="phone_number" value="Phone Number" />
        <TextInput id="phone_number" value={profileData.phone_number} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="cabinet_logo" value="Cabinet Logo" />
        <FileInput id="cabinet_logo" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Logo Preview" width={100} height={100} />}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">Submit</button>
    </form>
  ) : (
    <AccessRestricted />
  );
};

export default FormProfile;
