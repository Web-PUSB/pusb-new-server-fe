import React from "react";
import Widget from "@/pusb-admin/components/pusb-dashboard/Widget";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import ContainerEventList from "@/pusb-admin/components/pusb-event/ContainerEventList";
import { GetPUSBEvent } from "@/src/pages/api/pusb-events";
import { Events } from "@/src/types/pusb-event-type";

const Page = async () => {
  const events: Events[] = await GetPUSBEvent();
  const totalEvents = events.length;
  const presentEvents = events.filter(
    (event) => event.status === "PRESENT",
  ).length;
  const soonEvents = events.filter((event) => event.status === "SOON").length;
  const completeEvents = events.filter(
    (event) => event.status === "COMPLETED",
  ).length;
  return (
    <div className="w-full mt-8">
      <div className="mt-4 text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        repudiandae in perspiciatis et expedita voluptatum consequuntur tempore
        numquam debitis quam. Totam dolore alias quam reprehenderit, doloribus
        nam natus dicta suscipit?
      </div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7 text-blue-700" />}
          title={"Total Event's"}
          subtitle={`${totalEvents} event's`}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Present Events"}
          subtitle={`${presentEvents} event's`}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Soon Events"}
          subtitle={`${soonEvents} event's`}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Completed Events"}
          subtitle={`${completeEvents} event's`}
        />
      </div>
      <ContainerEventList events={events} />
    </div>
  );
};

export default Page;
