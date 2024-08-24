import { useState, useEffect } from "react";
import { newsApi } from "../servicePage/apiKeys";

const apiKey = newsApi;

const useNewsData = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        setLoading(true);
        let articles = [];
        let page = 1;
        const maxArticles = 10;

        while (articles.length < maxArticles) {
          const apiUrl = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&topic=health&lang=en&page=${page}&max=50`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (!data.articles || data.articles.length === 0) {
            break;
          }

          articles = [...articles, ...data.articles];
          page += 1;

          if (articles.length >= maxArticles) {
            articles = articles.slice(0, maxArticles);
          }
        }

        setNewsData(articles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchNewsData();
  }, []);

  return { newsData, loading, error };
};

export default useNewsData;
