import React from "react";
import Widget from "@/pusb-admin/components/pusb-dashboard/Widget";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import MiniCalendar from "@/pusb-admin/components/pusb-dashboard/MiniCalendar";
import EventChartByStatus from "@/pusb-admin/components/shared/chart/pusb-event/EventChartByStatus";
import EventChartByPeriod from "@/pusb-admin/components/shared/chart/pusb-event/EventChartByPeriod";
import ChartNewsByPublished from "@/pusb-admin/components/shared/chart/pusb-news/ChartNewsByPublished";
import ChartNewsByCategory from "@/pusb-admin/components/shared/chart/pusb-news/ChartNewsByCategory";
import CncChartByStatus from "@/pusb-admin/components/shared/chart/pusb-cnc/CncChartByStatusPeriodStatus";
import CncChartByCategory from "@/pusb-admin/components/shared/chart/pusb-cnc/CncChartByCategory";
import MiniTableNews from "@/pusb-admin/components/pusb-dashboard/MiniTableNews";
import { GetPUSBEvent } from "@/src/pages/api/pusb-events";
import { GetPUSBCNC } from "@/pusb-admin/pages/api/pusb-cnc";
import { CNC } from "@/src/types/pusb-cnc-type";
import { GetPUSBNews } from "../../../../pages/api/pusb-news";

const page = async () => {
  const events = await GetPUSBEvent();
  const eventsTotal = events.length;

  const cncs = await GetPUSBCNC();
  const activeCncs = cncs.filter((cnc: CNC) => cnc.status === true).length;

  const newses = await GetPUSBNews();
  const newsesTotal = newses.length;
  return (
    <div className="w-full mt-3 text-black">
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7 text-blue-700" />}
          title={"Members"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"User"}
          subtitle={"$1,000"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Ministries"}
          subtitle={"$2433"}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Event"}
          subtitle={`${eventsTotal} Event`}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"CnC"}
          subtitle={`${activeCncs} Active`}
        />

        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={`News`}
          subtitle={`${newsesTotal} News`}
        />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="grid grid-cols-1 rounded-[20px]">
          <MiniCalendar />
        </div>
        <div>
          <MiniTableNews />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div>
          <EventChartByStatus />
        </div>
        <div className="grid grid-cols-1 rounded-[20px]">
          <EventChartByPeriod />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div>
          <CncChartByStatus />
        </div>
        <div className="grid grid-cols-1 rounded-[20px]">
          <CncChartByCategory />
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="grid grid-cols-1 rounded-[20px]">
          <ChartNewsByCategory />
        </div>
        <div>
          <ChartNewsByPublished />
        </div>
      </div>
    </div>
  );
};

export default page;
