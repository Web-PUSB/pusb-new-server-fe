"use client";
import React, { useState, useEffect } from "react";
import { ProfileRequest } from "@/pusb-admin/types/pusb-profile-type";
import { FileInput, Label, TextInput, Textarea } from "flowbite-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  CreatePUSBProfile,
  GetPUSBProfile,
} from "@/src/pages/api/pusb-profile";
import AccessRetristected from "@/pusb-admin/components/shared/AccessRetristected";

// const fetcherProfile = async () => await GetPUSBProfile();

const FormProfile = ({ isEditMode }: { isEditMode?: boolean }) => {
  // const { data: profile, mutate: mutateProfile } = useSWR('pusb-profiles', fetcherProfile);
  const { data: session } = useSession();
  const token = session?.user.accessToken || "";
  const router = useRouter();

  const [profileData, setProfileData] = useState<ProfileRequest>({
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

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchCnCData = async () => {
      if (isEditMode) {
        try {
          const data = await GetPUSBProfile();
          console.log(data);
          if (data) {
            setProfileData({
              cabinet_name: data.cabinet_name || "",
              cabinet_logo: data.cabinet_logo || "",
              tagline: data.tagline || "",
              address: data.address || "",
              vision: data.vision || "",
              instagram: data.instagram || "",
              email: data.email || "",
              podcast: data.podcast || "",
              twitter: data.twitter || "",
              youtube: data.youtube || "",
              linkedin: data.linkedin || "",
              phone_number: data.phone_number || "",
            });

            if (data.cabinet_logo) {
              setImagePreview(data.cabinet_logo);
            }
          } else {
            console.warn("No profile data found with the provided ID.");
          }
        } catch (error) {
          console.error("Failed to fetch profile data:", error);
        }
      }
    };

    fetchCnCData();
  }, [isEditMode]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
      setErrorMessage("");

      setProfileData((prevData) => ({
        ...prevData,
        cabinet_logo: file.name,
      }));
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cabinet_name", profileData.cabinet_name);
    formData.append("tagline", profileData.tagline);
    formData.append("address", profileData.address);
    formData.append("vision", profileData.vision);
    formData.append("instagram", profileData.instagram);
    formData.append("email", profileData.email);
    formData.append("podcast", profileData.podcast);
    formData.append("twitter", profileData.twitter);
    formData.append("youtube", profileData.youtube);
    formData.append("linkedin", profileData.linkedin);
    formData.append("phone_number", profileData.phone_number);
    if (imageFile) {
      formData.append("cabinet_logo", imageFile);
    } else if (profileData.cabinet_logo) {
      formData.append("cabinet_logo", profileData.cabinet_logo);
    }

    try {
      if (isEditMode) {
        const responseUpdate = await CreatePUSBProfile(formData, token);
        if (responseUpdate) {
          alert("Update successful");
          // await mutateProfile();
          router.push("/admin/pusb-profile");
        }
      }
      router.push("/admin/pusb-profile");
    } catch (error) {
      console.error("Failed to submit profile data", error);
    }
  };

  return (
    <>
      {session?.user ? (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-3xl space-y-4"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="cabinet_name" value="Cabinet Name" />
            </div>
            <TextInput
              id="cabinet_name"
              type="text"
              placeholder="Enter cabinet name"
              required
              shadow
              value={profileData.cabinet_name}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="Enter email"
                required
                shadow
                value={profileData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone_number" value="Phone Number" />
              </div>
              <TextInput
                id="phone_number"
                type="text"
                placeholder="Enter phone number"
                required
                shadow
                value={profileData.phone_number}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="instagram" value="Instagram" />
              </div>
              <TextInput
                id="instagram"
                type="text"
                placeholder="Enter instagram url"
                required
                shadow
                value={profileData.instagram}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="linkedin" value="Linkedin" />
              </div>
              <TextInput
                id="linkedin"
                type="text"
                placeholder="Enter linkedin url"
                required
                shadow
                value={profileData.linkedin}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="twitter" value="Twitter" />
              </div>
              <TextInput
                id="twitter"
                type="text"
                placeholder="Enter twitter url"
                required
                shadow
                value={profileData.twitter}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="youtube" value="Youtube" />
              </div>
              <TextInput
                id="youtube"
                type="text"
                placeholder="Enter youtube url"
                required
                shadow
                value={profileData.youtube}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="podcast" value="Spotify" />
              </div>
              <TextInput
                id="podcast"
                type="text"
                placeholder="Enter spotify url"
                required
                shadow
                value={profileData.podcast}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="tagline" value="Tagline" />
            </div>
            <TextInput
              id="tagline"
              type="text"
              placeholder="Enter tagline"
              required
              shadow
              value={profileData.tagline}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="address" value="Address" />
            </div>
            <TextInput
              id="address"
              type="text"
              placeholder="Enter address"
              required
              shadow
              value={profileData.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="vision" value="Vision" />
            </div>
            <Textarea
              id="vision"
              placeholder="Enter vision"
              required
              rows={4}
              value={profileData.vision}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="cabinet_logo" value="Cabinet Logo" />
            </div>
            <FileInput
              id="cabinet_logo"
              helperText="A picture of the cabinet logo"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-2">
                <Image
                  src={imagePreview}
                  width={100}
                  height={100}
                  alt="Logo Preview"
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
              Submit
            </button>
          </div>
        </form>
      ) : (
        <AccessRetristected />
      )}
    </>
  );
};

export default FormProfile;
