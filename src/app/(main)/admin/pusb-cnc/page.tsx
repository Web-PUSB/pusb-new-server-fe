import React from "react";
import Widget from "@/pusb-admin/components/pusb-dashboard/Widget";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { GetPUSBCNC } from "@/pusb-admin/pages/api/pusb-cnc";
import ContainerCnCList from "@/pusb-admin/components/pusb-cnc/ContainerCnCList";
import { CNC } from "@/src/types/pusb-cnc-type";
const Page = async () => {
  const cncs: CNC[] = await GetPUSBCNC();
  const totalCncs = cncs.length;
  const sportCnC = cncs.filter((cnc) => cnc.category === "Sport").length;
  const artCnC = cncs.filter((cnc) => cnc.category === "Art").length;
  const societyCnC = cncs.filter((cnc) => cnc.category === "Society").length;
  const activeCnC = cncs.filter((cnc) => cnc.status === true).length;
  const inactiveCnC = cncs.filter((cnc) => cnc.status === false).length;

  if (!cncs) {
    return (
      <div className="mt-8">
        <h2 className="text-3xl font-semibold pt-2 pb-4">PUSB CNC</h2>
        <div className="mt-4 text-red-500">
          Failed to load CnC data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mt-4 text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        repudiandae in perspiciatis et expedita voluptatum consequuntur tempore
        numquam debitis quam. Totam dolore alias quam reprehenderit, doloribus
        nam natus dicta suscipit?
      </div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
        <Widget
          icon={<MdBarChart className="h-7 w-7 text-blue-700" />}
          title={"Total CnC"}
          subtitle={`${totalCncs} cnc`}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Active"}
          subtitle={`${activeCnC} cnc`}
        />
        <Widget
          icon={<MdDashboard className="h-7 w-7" />}
          title={"Inactive"}
          subtitle={`${inactiveCnC} cnc`}
        />
      </div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Sport CnC"}
          subtitle={`${sportCnC} cnc`}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Art CnC"}
          subtitle={`${artCnC} cnc`}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Society CnC"}
          subtitle={`${societyCnC} cnc`}
        />
      </div>
      <ContainerCnCList cncs={cncs} />
    </div>
  );
};

export default Page;
