import React from "react";
import { FiPlus } from "react-icons/fi";
import NewsList from "./NewsList";

const ContainerNewsList = ({ news }) => {
  return (
    <>
      <div className="mt-4 mb-8 w-full flex justify-end">
        <a href={`pusb-news/create`}>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <FiPlus className="h-5 w-5 mr-2" />
            New
          </button>
        </a>
      </div>
      <NewsList newss={news} />
    </>
  );
};

export default ContainerNewsList;
