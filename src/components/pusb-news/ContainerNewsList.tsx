import React from "react";
import { Button } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import NewsList from "./NewsList";
import { News } from "@/src/types/pusb-news-type";
const ContainerNewsList = ({ news }: { news: News[] }) => {
  return (
    <>
      <div className="mt-4 mb-8 w-full flex justify-end">
        <Link href={`pusb-news/create`}>
          <Button>
            <FiPlus className="h-5 w-5 mr-4" />
            New
          </Button>
        </Link>
      </div>
      <NewsList newss={news} />
    </>
  );
};

export default ContainerNewsList;
