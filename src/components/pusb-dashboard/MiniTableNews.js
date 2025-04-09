import React, { useEffect, useState } from "react";
import axios from "axios";

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval > 1) return `${interval} ${unit}s ago`;
    if (interval === 1) return `1 ${unit} ago`;
  }

  return "just now";
};

const MiniTableNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await axios.get("https://api.pusb.or.id/v1/news");
      const { data } = response.data;
  
      const filteredAndSorted = (data || [])
        .filter((item) => new Date(item.publish_date) <= new Date())
        .sort(
          (a, b) =>
            new Date(b.publish_date).getTime() -
            new Date(a.publish_date).getTime()
        )
        .slice(0, 5);
  
      setNews(filteredAndSorted);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;

  if (!news || news.length === 0) {
    return (
      <div className="card center">
        <p>No news available</p>
      </div>
    );
  }

  return (
    <div className="card scrollable">
      <div className="header">
        <h2>Latest news...</h2>
      </div>
      <table className="news-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Issued At</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{formatTimeAgo(item.publish_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MiniTableNews;
