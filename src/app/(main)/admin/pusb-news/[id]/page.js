import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContainerNews from "../../../../../components/pusb-news/ContainerNews";
import { GetPUSBNewsById } from "../../../../../pages/api/pusb-news";

const Page = () => {
  const { id } = useParams(); // Get the slug from the URL
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await GetPUSBNewsById(id);
        setNews(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, [id]);

  return (
    <div className="mt-8">
      {news ? <ContainerNews news={news} /> : <p>Loading.....</p>}
    </div>
  );
};

export default Page;
