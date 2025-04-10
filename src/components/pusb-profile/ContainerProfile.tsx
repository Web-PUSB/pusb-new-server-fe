import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Profile } from "@/pusb-admin/types/pusb-profile-type";
import {
  FiEdit,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
} from "react-icons/fi";
import { Button } from "flowbite-react";
import { AiFillSpotify } from "react-icons/ai";
const ContainerProfile = ({ profile }: { profile: Profile }) => {
  return (
    profile && (
      <>
        <div className="w-full flex justify-between items-center">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-gray-800">
              {profile.cabinet_name}
            </h2>
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
                <Link href={profile.instagram}>
                  <p className="text-sm font-medium"> {profile.instagram} </p>
                </Link>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <FiTwitter className="w-4 h-4" /> :
                <Link href={profile.twitter}>
                  <p className="text-sm font-medium"> {profile.twitter} </p>
                </Link>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <FiLinkedin className="w-4 h-4" /> :
                <Link href={profile.linkedin}>
                  <p className="text-sm font-medium"> {profile.linkedin} </p>
                </Link>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <FiYoutube className="w-4 h-4" /> :
                <Link href={profile.youtube}>
                  <p className="text-sm font-medium"> {profile.youtube} </p>
                </Link>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <AiFillSpotify className="w-4 h-4" /> :
                <Link href={profile.podcast}>
                  <p className="text-sm font-medium"> {profile.podcast} </p>
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <Link href={`/admin/pusb-profile/profile/create`}>
                <Button>
                  <FiEdit className="h-5 w-5 mr-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Image
              className="w-[14rem] h-[14rem] flex-shrink-0 object-contain xl:w-[18rem] xl:h-[18rem]"
              src={profile.cabinet_logo}
              width={1000}
              height={1000}
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
