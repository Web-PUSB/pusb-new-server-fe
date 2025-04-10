import React from "react";
import { GetPUSBProfile } from "@/pusb-admin/pages/api/pusb-profile";

import ContainerProfile from "@/pusb-admin/components/pusb-profile/ContainerProfile";
import ContainerWorkplanList from "@/src/components/pusb-profile/Workplan/ContainerWorkplanList";
import { GetPUSBWorkplanCategory } from "@/src/pages/api/pusb-workplan";
const PageList = async () => {
  const profile = await GetPUSBProfile();
  const Workplan = await GetPUSBWorkplanCategory();
  if (!profile || !Workplan) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ContainerProfile profile={profile} />
      <ContainerWorkplanList Workplan={Workplan} />
    </>
  );
};

export default PageList;
