import React from "react";
import Card from "@/pusb-admin/components/shared/Card";
import { GetPUSBNews } from "@/src/pages/api/pusb-news";
import { News } from "@/pusb-admin/types/pusb-news-type";
import { formatTimeAgo } from "@/src/utils/FormatTimeAgo";

const MiniTableNews = async () => {
  const news: News[] | null = await GetPUSBNews();

  if (!news || news.length === 0) {
    return (
      <Card extra="flex w-full h-full flex-col justify-center items-center px-3 py-3 text-black">
        <p>No news available</p>
      </Card>
    );
  }

  const latestNews = news
    .filter((item) => new Date(item.publish_date) <= new Date())
    .sort(
      (a, b) =>
        new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime(),
    )
    .slice(0, 5);

  return (
    <Card extra="flex w-full h-full flex-col justify-center items-center px-3 py-3 text-black overflow-x-auto">
      <div className="w-full px-2 py-3">
        <h2 className="text-xl font-bold">Latest news...</h2>
      </div>
      <table className="min-w-full h-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Title
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Category
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Issued At
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {latestNews.map((news) => (
            <tr key={news.id}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {news.title}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {news.category}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {formatTimeAgo(news.publish_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default MiniTableNews;
