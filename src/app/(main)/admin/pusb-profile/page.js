import React from "react";
import { getPUSBProfile } from "../../../../pages/api/pusb-profile";
import ContainerProfile from "../../../../components/pusb-profile/ContainerProfile";
import ContainerWorkplanList from "../../../../components/pusb-profile/Workplan/ContainerWorkplanList";
import { getPUSBWorkplanCategory } from "../../../../pages/api/pusb-workplan";
const PageList = async () => {
  const profile = await getPUSBProfile();
  const Workplan = await getPUSBWorkplanCategory();
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
