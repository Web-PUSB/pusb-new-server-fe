import React, { useEffect, useState } from "react";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";

import Widget from "../components/pusb-dashboard/Widget";
import MiniCalendar from "../components/pusb-dashboard/MiniCalendar";
import MiniTableNews from "../components/pusb-dashboard/MiniTableNews";
import EventChartByStatus from "../components/shared/chart/pusb-event/EventChartByStatus";
import EventChartByPeriod from "../components/shared/chart/pusb-event/EventChartByPeriod";
import ChartNewsByPublished from "../components/shared/chart/pusb-news/ChartNewsByPublished";
import ChartNewsByCategory from "../components/shared/chart/pusb-news/ChartNewsByCategory";
import CncChartByStatus from "../components/shared/chart/pusb-cnc/CncChartByStatusPeriodStatus";
import CncChartByCategory from "../components/shared/chart/pusb-cnc/CncChartByCategory";

import { getPUSBEvent } from "../api/pusb-events";
import { getPUSBCNC } from "../api/pusb-cnc";
import { getPUSBNews } from "../api/pusb-news";

const Page = () => {
  const [eventsTotal, setEventsTotal] = useState(0);
  const [activeCncs, setActiveCncs] = useState(0);
  const [newsesTotal, setNewsesTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await getPUSBEvent();
        setEventsTotal(events.length);

        const cncs = await getPUSBCNC();
        setActiveCncs(cncs.filter((cnc) => cnc.status === true).length);

        const newses = await getPUSBNews();
        setNewsesTotal(newses.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full mt-3 text-black">
      {/* Widgets */}
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

      {/* Calendar & Table */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="grid grid-cols-1 rounded-[20px]">
          <MiniCalendar />
        </div>
        <div>
          <MiniTableNews />
        </div>
      </div>

      {/* Event Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div>
          <EventChartByStatus />
        </div>
        <div className="grid grid-cols-1 rounded-[20px]">
          <EventChartByPeriod />
        </div>
      </div>

      {/* CNC Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div>
          <CncChartByStatus />
        </div>
        <div className="grid grid-cols-1 rounded-[20px]">
          <CncChartByCategory />
        </div>
      </div>

      {/* News Charts */}
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

export default Page;
