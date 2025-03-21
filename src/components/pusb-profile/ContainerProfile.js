import React from "react";
import { FiEdit, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";
import { AiFillSpotify } from "react-icons/ai";

const ContainerProfile = ({ profile }) => {
  return (
    profile && (
      <>
        <div className="w-full flex justify-between items-center">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-gray-800">{profile.cabinet_name}</h2>
            <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">
              {profile.tagline}
            </p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
              {profile.email} | {profile.phone_number}
            </p>
            <p className="text-base font-medium text-gray-700 dark:text-gray-400">
              {profile.address}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="flex items-center gap-2 mt-1">
                <FiInstagram className="w-4 h-4" /> :
                <a href={profile.instagram} className="text-sm font-medium" target="_blank" rel="noopener noreferrer">
                  {profile.instagram}
                </a>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <FiTwitter className="w-4 h-4" /> :
                <a href={profile.twitter} className="text-sm font-medium" target="_blank" rel="noopener noreferrer">
                  {profile.twitter}
                </a>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <FiLinkedin className="w-4 h-4" /> :
                <a href={profile.linkedin} className="text-sm font-medium" target="_blank" rel="noopener noreferrer">
                  {profile.linkedin}
                </a>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <FiYoutube className="w-4 h-4" /> :
                <a href={profile.youtube} className="text-sm font-medium" target="_blank" rel="noopener noreferrer">
                  {profile.youtube}
                </a>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <AiFillSpotify className="w-4 h-4" /> :
                <a href={profile.podcast} className="text-sm font-medium" target="_blank" rel="noopener noreferrer">
                  {profile.podcast}
                </a>
              </div>
            </div>

            <div className="mt-4">
              <a href="/admin/pusb-profile/profile/create">
                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  <FiEdit className="h-5 w-5 mr-2" />
                  Edit Profile
                </button>
              </a>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <img
              className="w-[14rem] h-[14rem] flex-shrink-0 object-contain xl:w-[18rem] xl:h-[18rem]"
              src={profile.cabinet_logo}
              alt="logo image"
            />
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
            Vision
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-justify">
            {profile.vision}
          </p>
        </div>
      </>
    )
  );
};

export default ContainerProfile;
