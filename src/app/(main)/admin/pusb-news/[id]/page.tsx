import React from "react";
import ContainerNews from "@/pusb-admin/components/pusb-news/ContainerNews";
import { GetPUSBNewsById } from "@/pusb-admin/pages/api/pusb-news";
const Page = async ({ params }: { params: { id: string } }) => {
  const news = await GetPUSBNewsById(params.id);
  return (
    <div className="mt-8">
      {news ? <ContainerNews news={news} /> : <p>Loading.....</p>}
    </div>
  );
};

export default Page;
