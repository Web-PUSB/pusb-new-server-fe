import React from "react";
import ContainerCnC from "@/pusb-admin/components/pusb-cnc/ContainerCnC";
import { GetPUSBCNCById } from "../../../../../../pages/api/pusb-cnc";
import { CNC } from "@/src/types/pusb-cnc-type";
const page = async ({ params }: { params: { id: string } }) => {
  const cnc: CNC = await GetPUSBCNCById(params.id);
  return (
    <div className="mt-4">
      {cnc ? <ContainerCnC cnc={cnc} /> : <p>Loading...</p>}
    </div>
  );
};

export default page;
