import React from "react";
import { FiEdit } from "react-icons/fi";

const ContainerNews = ({ news }) => {
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section>
      <div className="w-full flex justify-between items-center">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-gray-800">{news.title}</h2>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-400">
            Category: {news.category}
          </p>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Published on: {formatTime(news.publish_date)}
          </p>
          <div className="mt-4">
            <a href={`/admin/pusb-news/${news.id}/edit`}>
              <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <FiEdit className="h-5 w-5 mr-2" />
                Edit
              </button>
            </a>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <img
            className="w-[14rem] h-[14rem] flex-shrink-0 object-contain xl:w-[18rem] xl:h-[18rem]"
            src={news.thumbnail}
            alt="logo image"
          />
        </div>
      </div>
      <div className="space-y-3 mt-8">
        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
          Short Description News
        </h1>
        <p className="text-gray-500 dark:text-gray-300 text-justify">
          {news.description}
        </p>
      </div>
      <div className="space-y-2 mt-4">
        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
          Content News
        </h1>
        <p
          className="text-gray-500 dark:text-gray-300 text-justify"
          style={{ whiteSpace: "pre-line" }}
        >
          {news.content}
        </p>
      </div>
    </section>
  );
};

export default ContainerNews;
