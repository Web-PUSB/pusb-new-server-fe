import React, { useEffect, useState } from "react";
import Card from "../../components/shared/Card";
import { GetPUSBNews } from "../../api/pusb-news"; 
import { formatTimeAgo } from "../../utils/FormatTimeAgo"; 

const MiniTableNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const fetchedNews = await GetPUSBNews();
      if (fetchedNews) {
        setNews(
          fetchedNews
            .filter((item) => new Date(item.publish_date) <= new Date())
            .sort(
              (a, b) =>
                new Date(b.publish_date).getTime() -
                new Date(a.publish_date).getTime()
            )
            .slice(0, 5)
        );
      }
    };

    fetchNews();
  }, []);

  if (!news || news.length === 0) {
    return (
      <Card extra="flex w-full h-full flex-col justify-center items-center px-3 py-3 text-black">
        <p>No news available</p>
      </Card>
    );
  }

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
          {news.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {item.title}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {item.category}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {formatTimeAgo(item.publish_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default MiniTableNews;
