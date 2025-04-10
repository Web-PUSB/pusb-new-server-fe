import React from "react";
import Widget from "@/pusb-admin/components/pusb-dashboard/Widget";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";
import ContainerNewsList from "@/pusb-admin/components/pusb-news/ContainerNewsList";
import { GetPUSBNews } from "@/pusb-admin/pages/api/pusb-news";
import { News } from "@/src/types/pusb-news-type";

const Page = async () => {
  const newses: News[] = await GetPUSBNews();
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const totalNews = newses.length;

  const pressReleaseCategoryNews = newses.filter(
    (news) => news.category === "Press Release",
  ).length;

  const eventsCategoryNews = newses.filter(
    (news) => news.category === "Event",
  ).length;

  const WorkplansCategoryNews = newses.filter(
    (news) => news.category === "Workplan",
  ).length;

  const currentMonthNews = newses.filter((news) => {
    const publishDate = new Date(news.publish_date);
    return publishDate >= startOfMonth && publishDate <= endOfMonth;
  });

  const totalNewsThisMonth = currentMonthNews.length;

  if (!newses) {
    return (
      <div className="mt-8">
        <h2 className="text-3xl font-semibold pt-2 pb-4">PUSB News</h2>
        <div className="mt-4 text-red-500">
          Failed to load news. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mt-4 text-justify">
        The PUSB News Management System provides timely and accurate updates for
        the public, students, and campus community, keeping everyone informed
        with the latest news and announcements.
      </div>

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2">
        <Widget
          icon={<MdBarChart className="h-7 w-7 text-blue-700" />}
          title={"Total News"}
          subtitle={`${totalNews} news`}
        />

        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={`Total News in this month`}
          subtitle={`${totalNewsThisMonth} news`}
        />
      </div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Event News"}
          subtitle={`${eventsCategoryNews} news`}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Workplan News"}
          subtitle={`${WorkplansCategoryNews} news`}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Press Release News"}
          subtitle={`${pressReleaseCategoryNews} news`}
        />
      </div>
      <ContainerNewsList news={newses} />
    </div>
  );
};

export default Page;
